import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
    },
    blogs: [{ type: Schema.Types.ObjectId, ref: "Blog", required: true }],
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
