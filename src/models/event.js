import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';

import logger from '../utils/logger';

// Change time and date from STRING to DATE

export const EventSchema = new Schema(
	{
    event_title: {
      type: String,
      trim: true,
      indexes: true,
      required: true,
    },
    event_time: {
      type: String,
      trim: true,
      required: true
    },
    event_date: {
      type: String,
      trim: true,
      required: true
    },
    event_location: {
      type: String,
      trim: true,
      required: true
    },
    event_content: {
      type: String,
      trim: true,
      required: true
    },
    featured_img: {
      type: String,
      trim: true,
      required: true
    }
	},
	{ collection: 'events' }
);

EventSchema.plugin(timestamps);
EventSchema.plugin(mongooseStringQuery);


module.exports = exports = mongoose.model('Event', EventSchema);
