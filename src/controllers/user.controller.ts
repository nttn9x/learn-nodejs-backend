import { Request, Response, NextFunction } from "express";

import * as userService from "services/user.service";

export const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.find();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.create(req.body);

    res.json(user);
  } catch (err) {
    next(err);
  }
};
