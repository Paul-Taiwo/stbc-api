import fs from "fs";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import winston from "winston";
import compression from "compression";
import expressWinston from "express-winston";
import { config as envConfig } from "dotenv";
import { MainRoute, EventRoute, SermonRoute, BlogRoute } from "./routes";
import winstonPapertrail from "winston-papertrail";
import jwt from "express-jwt";

import config from "./config";
import logger from "fancy-log";

envConfig();
const api = express();

const PORT = process.env.PORT || config.server.port;

api.use(cors());
api.use(compression());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

// api.use(
//   jwt({ secret: config.jwt.secret }).unless({
//     path: [
//       "/",
//       "/events",
//       "/api",
//       "/auth/signup",
//       "/auth/login",
//       "/auth/forgot-password",
//       "/auth/reset-password",
//     ],
//   })
// );

api.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Missing authentication credentials.");
  }
});

api.use("/api/v1", [MainRoute, EventRoute, SermonRoute, BlogRoute]);

api.use("**", (req, res) =>
  res.status(404).json({
    message: "Not Found",
  })
);

api.listen(process.env.PORT || config.server.port, (err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }

  require("./utils/db");

  logger.info(`API is now running on port ${PORT} on ${config.env} mode`);
});

module.exports = api;
