import { Schema, model } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}
const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String,
});

const UserModel = model<User>("User", schema);

export default UserModel;
