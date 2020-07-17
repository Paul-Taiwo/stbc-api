"use strict";

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _cloudinary = require("../utils/cloudinary");

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _models = require("../models");

var _logger = require("../utils/logger");

var _logger2 = _interopRequireDefault(_logger);

var _winston = require("winston");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.list = function (req, res) {
  var params = req.params || {};
  var query = req.query || {};

  var page = parseInt(query.page, 10) || 0;
  var perPage = parseInt(query.per_page, 10) || 10;

  _models.SermonModel.apiQuery(req.query).select("sermon_title sermon_author sermon_content featured_img createdAt updatedAt").then(function (sermon) {
    res.status(200).json({
      status: 200,
      data: [].concat(_toConsumableArray(sermon))
    });
  }).catch(function (err) {
    _logger2.default.error(err);
    res.status(422).send(err.errors);
  });
};

exports.get = function (req, res) {
  _models.SermonModel.findById(req.params.sermonId).exec().then(function (sermon) {
    res.status(200).json({
      status: 200,
      data: sermon
    });
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
//     return res.status(422).send("Eventsnames must be alphanumeric.");
//   }

//   Events.findByIdAndUpdate({ _id: req.params.userId }, data, { new: true })
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

  _cloudinary2.default.uploader.upload(data.featured_img, { folder: "sermons" }, function (error, result) {
    if (error) {
      return res.status(500).json({
        error: error
      });
    }

    if (result) {
      // data.featured_img = result.secure_url;
      data.featured_img = result.url;

      _models.SermonModel.create(data).then(function (sermon) {
        return res.status(200).json(sermon);
      }).catch(function (err) {
        _logger2.default.error(err);
        return res.status(500).send(err);
      });
    }
  });
};

// exports.delete = (req, res) => {
//   Events.findByIdAndUpdate(
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
//# sourceMappingURL=sermon.js.map