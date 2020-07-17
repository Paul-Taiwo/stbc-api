"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Route = _express2.default.Router();

Route.get("/sermons", _controllers.SermonController.list);
Route.get("/sermons/:sermonId", _controllers.SermonController.get);
Route.post("/sermons/", _controllers.SermonController.post);

exports.default = Route;
//# sourceMappingURL=sermon.js.map