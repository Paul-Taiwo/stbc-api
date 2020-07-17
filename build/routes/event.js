"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Route = _express2.default.Router();

Route.get("/events", _controllers.EventController.list);
Route.get("/events/:eventId", _controllers.EventController.get);
Route.post("/events/", _controllers.EventController.post);

exports.default = Route;
//# sourceMappingURL=event.js.map