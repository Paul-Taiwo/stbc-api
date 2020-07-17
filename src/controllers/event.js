import async from "async";

import { EventModel } from "../models";

import logger from "../utils/logger";

exports.list = (req, res) => {
  const params = req.params || {};
  const query = req.query || {};

  const page = parseInt(query.page, 10) || 0;
  const perPage = parseInt(query.per_page, 10) || 10;
  EventModel.apiQuery(req.query)
    .select("event_title name event_date event_content")
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((err) => {
      logger.error(err);
      res.status(422).send(err.errors);
    });
};

exports.get = (req, res) => {
  EventModel.findById(req.params.eventId)
    .then((event) => {
      res.status(200).json(event);
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

exports.post = (req, res) => {
  const data = Object.assign({}, req.body) || {};

  EventModel.create(data)
    .then((event) => {
      res.status(200).json(event);
    })
    .catch((err) => {
      logger.error(err);
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
