import { apiBuilder } from "utils/api-builder.util";
import OrganizationModel from "./organization.model";

export const find = async (options?: any) => {
  return await apiBuilder(OrganizationModel, options);
};

export const remove = async (id: string) => {
  return await OrganizationModel.findOneAndDelete({ _id: id });
};
