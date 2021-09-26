import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import _size from "lodash/size";

import * as userService from "routers/v1/user/user.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await userService.findOne({ email, password });

    if (!user) {
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
