import { Request, Response, NextFunction } from "express";

import * as userService from "./user.service";

export const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.find();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.get(req.params.id);

    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.remove(req.params.id);

    res.end();
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

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.update(req.params.id, req.body);
    console.log(user);

    res.json(user);
  } catch (err) {
    next(err);
  }
};
