import { Request, Response } from "express";
import { filterObject } from "utils/common.util";
import { catchAsync } from "utils/error.util";

import { User } from "./user.model";
import * as userService from "./user.service";

export const find = catchAsync(async (req: Request, res: Response) => {
  const routeParams: any = {};
  if (req.params.organizationId) {
    routeParams.organization = req.params.organizationId;
  }
  const users = await userService.find({ queryParams: req.query, routeParams });

  res.json(users);
});

export const get = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.get(req.params.id);

  res.json(users);
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  await userService.remove(req.params.id);

  res.end();
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.create(req.body);

  res.json(user);
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const filteredBody = filterObject<User>(
    req.body,
    "name",
    "email",
    "organization"
  );

  const user = await userService.update(req.params.id, filteredBody);

  res.json(user);
});
