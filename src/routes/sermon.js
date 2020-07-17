import express from "express";
import { SermonController } from "../controllers";

const Route = express.Router();

  Route.get("/sermons", SermonController.list);
  Route.get("/sermons/:sermonId", SermonController.get);
  Route.post("/sermons/", SermonController.post);

export default Route;