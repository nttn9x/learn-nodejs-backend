import OrganizationModel, { Organization } from "./organization.model";
import { apiBuilder } from "utils/api-builder.util";

export const find = async (options?: any) => {
  return await apiBuilder(OrganizationModel, options);
};

export const findOne = async (conditions?: any) => {
  return await OrganizationModel.findOne(conditions);
};

export const get = async (id: string) => {
  return await OrganizationModel.findById(id);
};

export const create = async (data: Organization) => {
  return await OrganizationModel.create(data);
};

export const update = async (id: string, data: Organization) => {
  return await OrganizationModel.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await OrganizationModel.findOneAndDelete({ _id: id });
};
