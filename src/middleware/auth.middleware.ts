import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(StatusCodes.FORBIDDEN).end();
  }

  try {
    //@ts-ignore
    jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    return res.status(StatusCodes.FORBIDDEN).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
