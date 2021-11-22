import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

export interface User {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  correctPassword: Function;
}
const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  avatar: String,
});

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcryptjs.hash(this.password, 12);
});

schema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcryptjs.compare(candidatePassword, userPassword);
};

const UserModel = model<User>("User", schema);

export default UserModel;
