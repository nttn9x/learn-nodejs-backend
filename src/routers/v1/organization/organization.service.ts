import OrganizationModel from "./organization.model";

export const remove = async (id: string) => {
  return await OrganizationModel.findOneAndDelete({ _id: id });
};
