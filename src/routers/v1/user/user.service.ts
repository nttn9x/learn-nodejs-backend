import UserModel, { User } from "./user.model";
import { apiBuilder } from "utils/api-builder.util";

export const find = async (options: any) => {
  return await apiBuilder(UserModel, options);
};

export const findOne = async (conditions?: any) => {
  return await UserModel.findOne(conditions);
};

export const get = async (id: string) => {
  return await UserModel.findById(id).populate("organization");
};

export const create = async (data: User) => {
  return await UserModel.create(data);
};

export const update = async (id: string, data: User) => {
  return await UserModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const remove = async (id: string) => {
  return await UserModel.findOneAndDelete({ _id: id });
};
