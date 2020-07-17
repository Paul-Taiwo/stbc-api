import mongoose, { Schema } from "mongoose";
import timestamps from "mongoose-timestamp";
import mongooseStringQuery from "mongoose-string-query";

import logger from "fancy-log";

export const BlogSchema = new Schema(
  {
    blog_title: {
      type: String,
      trim: true,
      indexes: true,
      required: true,
    },
    blog_tags: {
      type: String,
      required: false,
    },
    blog_comments: {
      type: Array,
      required: false,
    },
    blog_author: {
      type: String,
      trim: true,
      required: true,
    },
    blog_content: {
      type: String,
      required: true,
    },
    featured_img: {
      type: String,
      required: false,
    },
  },
  { collection: "blogs" }
);

BlogSchema.plugin(timestamps);
BlogSchema.plugin(mongooseStringQuery);

module.exports = exports = mongoose.model("Blog", BlogSchema);
