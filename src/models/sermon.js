import mongoose, { Schema } from "mongoose";
import timestamps from "mongoose-timestamp";
import mongooseStringQuery from "mongoose-string-query";

import logger from "fancy-log";

// Change time and date from STRING to DATE

export const SermonSchema = new Schema(
  {
    sermon_title: {
      type: String,
      trim: true,
      indexes: true,
      required: true,
    },
    sermon_author: {
      type: String,
      trim: true,
      required: true,
    },
    sermon_content: {
      type: String,
      trim: true,
      required: true,
    },
    featured_img: {
      type: String,
      trim: true,
      required: false,
    },
  },
  { collection: "sermons" }
);

SermonSchema.plugin(timestamps);
SermonSchema.plugin(mongooseStringQuery);

module.exports = exports = mongoose.model("Sermon", SermonSchema);
