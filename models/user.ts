import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    image: { type: String },
    firstLogin: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    focusSessions: {
      type: Map,
      of: Number,
      default: {},
    },
    totalFocusTime: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
