import { Request, Response } from "express";
import * as Factory from "routers/v1/factory";
import { catchAsync } from "utils/error.util";
import OrganizationModel from "./organization.model";
import * as OrganizationService from "./organization.service";

export const find = catchAsync(async (req: Request, res: Response) => {
  const Organizations = await OrganizationService.find(req.query);

  res.json(Organizations);
});

export const get = Factory.getData(OrganizationModel);
export const create = Factory.createData(
  OrganizationModel,
  /* allowedFields */ ["name"]
);
export const update = Factory.updateData(
  OrganizationModel,
  /* allowedFields */ ["name"]
);

export const remove = catchAsync(async (req: Request, res: Response) => {
  await OrganizationService.remove(req.params.id);

  res.end();
});
