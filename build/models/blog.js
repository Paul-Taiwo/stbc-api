"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlogSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require("mongoose-timestamp");

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _mongooseStringQuery = require("mongoose-string-query");

var _mongooseStringQuery2 = _interopRequireDefault(_mongooseStringQuery);

var _logger = require("../utils/logger");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlogSchema = exports.BlogSchema = new _mongoose.Schema({
  blog_title: {
    type: String,
    trim: true,
    indexes: true,
    required: true
  },
  blog_tags: {
    type: String,
    required: false
  },
  blog_comments: {
    type: Array,
    required: false
  },
  blog_author: {
    type: String,
    trim: true,
    required: true
  },
  blog_content: {
    type: String,
    required: true
  },
  featured_img: {
    type: String,
    required: false
  }
}, { collection: "blogs" });

BlogSchema.plugin(_mongooseTimestamp2.default);
BlogSchema.plugin(_mongooseStringQuery2.default);

module.exports = exports = _mongoose2.default.model("Blog", BlogSchema);
//# sourceMappingURL=blog.js.map