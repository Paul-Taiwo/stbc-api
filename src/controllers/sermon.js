import async from "async";
import cloudinary from "../utils/cloudinary";
import { SermonModel } from "../models";

import logger from "fancy-log";
import { format } from "winston";

exports.list = (req, res) => {
  const params = req.params || {};
  const query = req.query || {};

  const page = parseInt(query.page, 10) || 0;
  const perPage = parseInt(query.per_page, 10) || 10;

  SermonModel.apiQuery(req.query)
    .select("sermon_title sermon_author sermon_content featured_img createdAt updatedAt")
    .then((sermon) => {
      res.status(200).json({
        status: 200,
        data: [...sermon],
      });
    })
    .catch((err) => {
      logger.error(err);
      res.status(422).send(err.errors);
    });
};

exports.get = (req, res) => {
  SermonModel.findById(req.params.sermonId)
    .exec()
    .then((sermon) => {
      res.status(200).json({
        status: 200,
        data: sermon,
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

exports.post = (req, res) => {
  const data = Object.assign({}, req.body) || {};

  cloudinary.uploader.upload(
    data.featured_img,
    { folder: "sermons" },
    (error, result) => {
      if (error) {
        return res.status(500).json({
          error: error,
        });
      }

      if (result) {
        // data.featured_img = result.secure_url;
        data.featured_img = result.url;

        SermonModel.create(data)
          .then((sermon) => {
            return res.status(200).json(sermon);
          })
          .catch((err) => {
            logger.error(err);
            return res.status(500).send(err);
          });
      }
    }
  );
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
