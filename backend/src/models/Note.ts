import mongoose, { Schema } from "mongoose";

export interface INote extends mongoose.Document {
  title: string;
  content: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const NoteSchema = new Schema<INote>({
  title: { type: String, default: "" },
  content: { type: String, default: "" },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<INote>("Note", NoteSchema);
