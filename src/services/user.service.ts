import UserModel, { User } from "models/user.model";

export const find = async (conditions?: any) => {
  return await UserModel.find(conditions);
};

export const get = async (id: string) => {
  return await UserModel.findById(id);
};

export const create = async (data: User) => {
  return await UserModel.create(data);
};

export const update = async (id: string, data: User) => {
  return await UserModel.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await UserModel.findOneAndDelete({ _id: id });
};
