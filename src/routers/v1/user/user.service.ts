import { apiBuilder } from "utils/api-builder.util";
import UserModel from "./user.model";

export const find = async (options: any) => {
  return await apiBuilder(UserModel, options);
};

export const remove = async (id: string) => {
  return await UserModel.findOneAndDelete({ _id: id });
};
