import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import logger from "utils/logger.util";
import { catchAsync } from "utils/error.util";

import UserModel from "../user/user.model";

export const verifyToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];

    if (!token) {
      logger.error(`❌ Forbidden ${req.originalUrl}`);

      return res.status(StatusCodes.FORBIDDEN).end();
    }

    //@ts-ignore
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await UserModel.findById(decoded.id);

    // If user has changed pwd then have to login again
    if (!user || user.changePasswordAfter(decoded.iat)) {
      return res.status(StatusCodes.FORBIDDEN).end();
    }

    //@ts-ignore
    req.user = user;

    return next();
  }
);
