import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { User as IUser } from "../types";

interface IUserMethods {
  matchPassword(enteredPassword: string): Promise<boolean>;
}

type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    role: {
      type: String,
      enum: ["user", "artist", "admin", "subadmin"],
      default: "user",
    },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User =
  mongoose.models.users ||
  mongoose.model<IUser, UserModel>("users", userSchema);

export default User;
