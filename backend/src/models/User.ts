import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  name?: string;
  email: string;
  googleId?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>("User", UserSchema);
