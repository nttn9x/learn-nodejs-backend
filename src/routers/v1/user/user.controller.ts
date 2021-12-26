import { Request, Response } from "express";
import * as Factory from "routers/v1/factory";
import { catchAsync } from "utils/error.util";
import UserModel from "./user.model";
import * as userService from "./user.service";

export const find = catchAsync(async (req: Request, res: Response) => {
  const routeParams: any = {};
  if (req.params.organizationId) {
    routeParams.organization = req.params.organizationId;
  }
  const users = await userService.find({ queryParams: req.query, routeParams });

  res.json(users);
});

export const get = Factory.getData(UserModel, "organization");

export const create = Factory.createData(
  UserModel,
  /* allowedFields */ ["name", "email"]
);

export const update = Factory.updateData(
  UserModel,
  /* allowedFields */ ["name", "email", "organization"]
);

export const remove = catchAsync(async (req: Request, res: Response) => {
  await userService.remove(req.params.id);

  res.end();
});
