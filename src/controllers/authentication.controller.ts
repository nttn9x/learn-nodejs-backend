import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import _size from "lodash/size";

import * as userService from "services/user.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const users = await userService.find({ email, password });
    if (_size(users) < 1) {
      res.status(StatusCodes.UNAUTHORIZED).end();
    }
    const user = users[0];

    const secretKey = process.env.JWT_KEY;

    if (!secretKey) {
      res.end();
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
