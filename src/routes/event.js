import express from "express";
import { EventController } from "../controllers";

const Route = express.Router()

  Route.get("/events", EventController.list);
  Route.get("/events/:eventId", EventController.get);
  Route.post("/events/", EventController.post);

export default Route;