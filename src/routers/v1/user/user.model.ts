import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { IOrganization } from "../organization/organization.model";

export interface IUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  passwordResetToken?: string;
  passwordChangeAt?: any;
  passwordResetExpire?: any;
  avatar?: string;
  correctPassword: Function;
  createPasswordResetToken: Function;
  changePasswordAfter: Function;
  organization: IOrganization;
}

const schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  passwordChangeAt: { type: Date, select: false },
  passwordConfirm: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: function (el) {
        //@ts-ignore
        return el === this.password;
      },
      message: "Password are not the same!",
    },
  },
  passwordResetToken: String,
  passwordResetExpire: Date,
  avatar: String,
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
  },
});

schema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangeAt = Date.now();
  return next();
});

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcryptjs.hash(this.password, 12);
  this.passwordConfirm = undefined;
  return next();
});

schema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcryptjs.compare(candidatePassword, userPassword);
};

schema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // It works only 10 minutes from now
  this.passwordResetExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

schema.methods.changePasswordAfter = function (jwtTimestamp) {
  if (this.passwordChangeAt) {
    const changeTimestamp = parseInt(
      //@ts-ignore
      this.passwordChangeAt.getTime() / 1000,
      10
    );

    return jwtTimestamp < changeTimestamp;
  }

  return false;
};

const UserModel = model<IUser>("User", schema);

export default UserModel;
