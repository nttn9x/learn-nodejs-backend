import { Request, Response } from "express";
import { Model, UpdateQuery } from "mongoose";

import { filterObject } from "utils/common.util";
import { catchAsync } from "utils/error.util";

export const getData = <T extends unknown>(
  model: Model<T>,
  popOptions?: string
) =>
  catchAsync(async (req: Request, res: Response) => {
    const query = model.findById(req.params.id);
    if (popOptions) {
      query.populate(popOptions);
    }

    const data = await query;

    res.json({
      status: "success",
      data,
    });
  });

export const createData = <T extends unknown>(
  model: Model<T>,
  allowedFields?: string[]
) =>
  catchAsync(async (req: Request, res: Response) => {
    const filteredBody = filterObject<UpdateQuery<T>>(req.body, allowedFields);

    const data = await model.create(filteredBody);

    res.json({
      status: "success",
      data,
    });
  });

export const updateData = <T extends unknown>(
  model: Model<T>,
  allowedFields?: string[]
) =>
  catchAsync(async (req: Request, res: Response) => {
    const filteredBody = filterObject<UpdateQuery<T>>(req.body, allowedFields);

    const data = await model.findByIdAndUpdate(req.params.id, filteredBody, {
      new: true,
      runValidators: true,
    });

    res.json({
      status: "success",
      data,
    });
  });
