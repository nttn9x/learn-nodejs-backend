import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import _size from "lodash/size";

import { AppError } from "utils/error.util";
import { HTTP_CODE } from "constants/common.constant";

import UserModel from "../user/user.model";

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

    //@ts-ignore
    const token = jwt.sign({ email, id: user._id }, secretKey, {
      expiresIn: process.env.JWT_EXPIRED,
    });

    res.json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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

    // 2. Generate new pwd

    // 3. Send an email
  } catch (err) {
    next(err);
  }
};
