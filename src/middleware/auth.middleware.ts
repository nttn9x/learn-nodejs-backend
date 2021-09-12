import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import logger from "utils/logger.util";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    logger.error(`❌ Forbidden ${req.originalUrl}`);

    return res.status(StatusCodes.FORBIDDEN).end();
  }

  try {
    //@ts-ignore
    jwt.verify(token, process.env.JWT_KEY);
  } catch (err: any) {
    logger.error(err);

    return res.status(StatusCodes.FORBIDDEN).end();
  }
  return next();
};

export default verifyToken;
