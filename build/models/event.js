'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _mongooseStringQuery = require('mongoose-string-query');

var _mongooseStringQuery2 = _interopRequireDefault(_mongooseStringQuery);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Change time and date from STRING to DATE

var EventSchema = exports.EventSchema = new _mongoose.Schema({
  event_title: {
    type: String,
    trim: true,
    indexes: true,
    required: true
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
}, { collection: 'events' });

EventSchema.plugin(_mongooseTimestamp2.default);
EventSchema.plugin(_mongooseStringQuery2.default);

module.exports = exports = _mongoose2.default.model('Event', EventSchema);
//# sourceMappingURL=event.js.map