"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SermonSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require("mongoose-timestamp");

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _mongooseStringQuery = require("mongoose-string-query");

var _mongooseStringQuery2 = _interopRequireDefault(_mongooseStringQuery);

var _logger = require("../utils/logger");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Change time and date from STRING to DATE

var SermonSchema = exports.SermonSchema = new _mongoose.Schema({
  sermon_title: {
    type: String,
    trim: true,
    indexes: true,
    required: true
  },
  sermon_author: {
    type: String,
    trim: true,
    required: true
  },
  sermon_content: {
    type: String,
    trim: true,
    required: true
  },
  featured_img: {
    type: String,
    trim: true,
    required: false
  }
}, { collection: "sermons" });

SermonSchema.plugin(_mongooseTimestamp2.default);
SermonSchema.plugin(_mongooseStringQuery2.default);

module.exports = exports = _mongoose2.default.model("Sermon", SermonSchema);
//# sourceMappingURL=sermon.js.map