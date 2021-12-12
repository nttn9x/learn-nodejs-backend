import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import _size from "lodash/size";

import { AppError, catchAsync } from "utils/error.util";
import { HTTP_CODE } from "constants/common.constant";

import UserModel from "../user/user.model";

const signToken = ({ res, user }) => {
  const token = jwt.sign(
    { email: user.email, id: user._id },
    //@ts-ignore
    process.env.JWT_KEY,
    {
      expiresIn: process.env.JWT_EXPIRED,
    }
  );

  const cookieOptions: any = {
    expires: new Date(Date.now() * 24 * 60 * 60 * 1000),
  };

  if (process.env.NODE_ENV === "production") {
  }
  cookieOptions.secure = true;
  cookieOptions.httpOnly = true;

  // Remove password
  delete user.password;

  res.cookie("UFO", token, cookieOptions);
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).end();
      return;
    }

    const correct = await user.correctPassword(password, user.password);
    if (!correct) {
      res.status(StatusCodes.UNAUTHORIZED).end();
      return;
    }

    const secretKey = process.env.JWT_KEY;

    if (!secretKey) {
      res.end();
      return;
    }

    signToken({ user, res });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(
        new AppError(
          "Opps! There is no user with email address",
          HTTP_CODE.UNAUTHORIZED
        )
      );
    }
    // 2. Generate random token
    const resetToken = user.createPasswordResetToken();
    await user.save();

    // 3. Send an email
    res.json(user);
  }
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get
    //@ts-ignore
    const user: any = await UserModel.findById(req.user._id).select(
      "+password"
    );

    // Check password
    const correct = await user?.correctPassword(
      req.body.passwordCurrent,
      user.password
    );

    if (!correct) {
      return next(
        new AppError("Your current password is wrong.", HTTP_CODE.UNAUTHORIZED)
      );
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    signToken({ res, user });
  }
);
