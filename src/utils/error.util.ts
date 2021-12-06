import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  msg?: string;
  statusCode?: number;
  status?: string;
  isMyOperation: boolean;

  constructor(msg: string, statusCode: number) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(msg);

    this.msg = msg;
    this.statusCode = statusCode;
    this.status = statusCode && statusCode >= 400 ? "Error" : "Success";
    this.isMyOperation = false;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

export const catchAsync =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  };
