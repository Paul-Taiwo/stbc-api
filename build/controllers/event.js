"use strict";

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _models = require("../models");

var _logger = require("../utils/logger");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.list = function (req, res) {
  var params = req.params || {};
  var query = req.query || {};

  var page = parseInt(query.page, 10) || 0;
  var perPage = parseInt(query.per_page, 10) || 10;
  _models.EventModel.apiQuery(req.query).select("event_title name event_date event_content").then(function (events) {
    res.status(200).json(events);
  }).catch(function (err) {
    _logger2.default.error(err);
    res.status(422).send(err.errors);
  });
};

exports.get = function (req, res) {
  _models.EventModel.findById(req.params.eventId).then(function (event) {
    res.status(200).json(event);
  }).catch(function (err) {
    _logger2.default.error(err);
    res.status(422).send(err.errors);
  });
};

// exports.put = (req, res) => {
//   const data = req.body || {};

//   if (data.email && !validator.isEmail(data.email)) {
//     return res.status(422).send("Invalid email address.");
//   }

//   if (data.username && !validator.isAlphanumeric(data.username)) {
//     return res.status(422).send("EventModelnames must be alphanumeric.");
//   }

//   EventModel.findByIdAndUpdate({ _id: req.params.userId }, data, { new: true })
//     .then((user) => {
//       if (!user) {
//         return res.sendStatus(404);
//       }

//       user.password = undefined;
//       user.recoveryCode = undefined;

//       res.json(user);
//     })
//     .catch((err) => {
//       logger.error(err);
//       res.status(422).send(err.errors);
//     });
// };

exports.post = function (req, res) {
  var data = Object.assign({}, req.body) || {};

  _models.EventModel.create(data).then(function (event) {
    res.status(200).json(event);
  }).catch(function (err) {
    _logger2.default.error(err);
    res.status(500).send(err);
  });
};

// exports.delete = (req, res) => {
//   EventModel.findByIdAndUpdate(
//     { _id: req.params.user },
//     { active: false },
//     {
//       new: true,
//     }
//   )
//     .then((user) => {
//       if (!user) {
//         return res.sendStatus(404);
//       }

//       res.sendStatus(204);
//     })
//     .catch((err) => {
//       logger.error(err);
//       res.status(422).send(err.errors);
//     });
// };
//# sourceMappingURL=event.js.map