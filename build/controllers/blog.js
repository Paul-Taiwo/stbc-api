"use strict";

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _cloudinary = require("../utils/cloudinary");

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _models = require("../models");

var _logger = require("../utils/logger");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.list = function (req, res) {
  var params = req.params || {};
  var query = req.query || {};

  var page = parseInt(query.page, 10) || 0;
  var perPage = parseInt(query.per_page, 10) || 10;

  _models.BlogModel.apiQuery(req.query).select("blog_title blog_author blog_content blog_comments featured_img createdAt").then(function (blogs) {
    res.status(200).json({
      status: 200,
      data: blogs
    });
  }).catch(function (err) {
    _logger2.default.error(err);
    res.status(422).send(err.errors);
  });
};

exports.get = function (req, res) {
  _models.BlogModel.findById(req.params.postId).exec().then(function (blogPost) {
    res.status(200).json({
      status: 200,
      data: blogPost
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
//     return res.status(422).send("BlogModelnames must be alphanumeric.");
//   }

//   BlogModel.findByIdAndUpdate({ _id: req.params.userId }, data, { new: true })
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

  _cloudinary2.default.uploader.upload(data.featured_img, { folder: "blog-post" }, function (error, result) {
    if (error) {
      return res.status(500).json({
        error: error
      });
    }

    if (result) {
      // data.featured_img = result.secure_url;
      data.featured_img = result.url;

      _models.BlogModel.create(data).then(function (blog) {
        res.status(200).json(blog);
      }).catch(function (err) {
        _logger2.default.error(err);
        res.status(500).send(err);
      });
    }
  });
};

// exports.delete = (req, res) => {
//   BlogModel.findByIdAndUpdate(
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
//# sourceMappingURL=blog.js.map