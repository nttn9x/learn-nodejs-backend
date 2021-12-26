import { apiBuilder } from "utils/api-builder.util";
import UserModel from "./user.model";

export const find = async ({ queryParams, routeParams }: any) => {
  return await apiBuilder(UserModel.find(routeParams), queryParams, ["name"]);
};

export const remove = async (id: string) => {
  return await UserModel.findOneAndDelete({ _id: id });
};
