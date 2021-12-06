import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "utils/logger.util";

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);

  if (err.name === "ValidationError") {
    res.status(StatusCodes.BAD_REQUEST);
  } else if (err.code && err.code == 11000) {
    res.status(StatusCodes.CONFLICT);
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  res.status(err.statusCode || 500).json(err);
};
