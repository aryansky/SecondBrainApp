import mongoose, { Schema } from "mongoose";
import "dotenv/config";
import * as dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log("Successfully connected to the database!");
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const contentSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["video", "image", "document", "tweet", "link"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tags",
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const tagsSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const linkSchema = new Schema({
  shareId: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
export const Content = mongoose.model("Content", contentSchema);
export const Tags = mongoose.model("Tags", tagsSchema);
export const Link = mongoose.model("Link", linkSchema);
