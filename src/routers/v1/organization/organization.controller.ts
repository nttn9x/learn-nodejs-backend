import { Request, Response } from "express";
import { filterObject } from "utils/common.util";
import { catchAsync } from "utils/error.util";

import { Organization } from "./organization.model";
import * as OrganizationService from "./organization.service";

export const find = catchAsync(async (req: Request, res: Response) => {
  const Organizations = await OrganizationService.find(req.query);

  res.json(Organizations);
});

export const get = catchAsync(async (req: Request, res: Response) => {
  const Organizations = await OrganizationService.get(req.params.id);

  res.json(Organizations);
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  await OrganizationService.remove(req.params.id);

  res.end();
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const Organization = await OrganizationService.create(req.body);

  res.json(Organization);
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const filteredBody = filterObject<Organization>(req.body, "name", "email");

  const Organization = await OrganizationService.update(
    req.params.id,
    filteredBody
  );

  res.json(Organization);
});
