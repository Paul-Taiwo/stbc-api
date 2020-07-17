import async from "async";
import cloudinary from "../utils/cloudinary";

import { BlogModel } from "../models";

import logger from "../utils/logger";

exports.list = (req, res) => {
  const params = req.params || {};
  const query = req.query || {};

  const page = parseInt(query.page, 10) || 0;
  const perPage = parseInt(query.per_page, 10) || 10;

  BlogModel.apiQuery(req.query)
    .select("blog_title blog_author blog_content blog_comments featured_img createdAt")
    .then((blogs) => {
      res.status(200).json({
        status: 200,
        data: blogs,
      });
    })
    .catch((err) => {
      logger.error(err);
      res.status(422).send(err.errors);
    });
};

exports.get = (req, res) => {
  BlogModel.findById(req.params.postId)
    .exec()
    .then((blogPost) => {
      res.status(200).json({
        status: 200,
        data: blogPost,
      });
    })
    .catch((err) => {
      logger.error(err);
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

exports.post = (req, res) => {
  const data = Object.assign({}, req.body) || {};

  cloudinary.uploader.upload(
    data.featured_img,
    { folder: "blog-post" },
    (error, result) => {
      if (error) {
        return res.status(500).json({
          error: error,
        });
      }

      if (result) {
        // data.featured_img = result.secure_url;
        data.featured_img = result.url;

        BlogModel.create(data)
          .then((blog) => {
            res.status(200).json(blog);
          })
          .catch((err) => {
            logger.error(err);
            res.status(500).send(err);
          });
      }
    }
  );
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
