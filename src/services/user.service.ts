import UserModel, { User } from "models/user.model";

export const find = async () => {
  return await UserModel.find();
};

export const create = async (data: User) => {
  return await UserModel.create(data);
};
