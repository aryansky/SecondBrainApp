import mongoose, { Schema } from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/test");

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const contentSchema = new Schema({
  link: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    enum: ["video", "image", "article", "audio"],
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  tags: {
    type: Schema.Types.ObjectId,
    ref: "Tags",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const tagsSchema = new Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
});

const linkSchema = new Schema({
  hash: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
});

export const User = mongoose.model("User", userSchema);
export const Content = mongoose.model("Content", contentSchema);
export const Tags = mongoose.model("Tags", tagsSchema);
export const Link = mongoose.model("Link", linkSchema);
