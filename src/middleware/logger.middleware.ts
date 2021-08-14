import { NextFunction, Request, Response } from "express";
import logger from "utils/logger.util";
import { getDurationInMilliseconds } from "utils/time.util";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  res.on("close", () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    logger.trace(
      `🚀 ${durationInMilliseconds.toLocaleString()}ms ${req.method} ${
        req.originalUrl
      }`
    );
  });

  next();
};

export default loggerMiddleware;
