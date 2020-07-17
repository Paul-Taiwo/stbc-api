"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

Router.get("/blogs", _controllers.BlogController.list);
Router.get("/blogs/:postId", _controllers.BlogController.get);
Router.post("/blogs", _controllers.BlogController.post);

exports.default = Router;
//# sourceMappingURL=blog.js.map