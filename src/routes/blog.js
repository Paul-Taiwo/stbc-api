import express from "express";
import { BlogController } from "../controllers";

const Router = express.Router();

Router.get("/blogs", BlogController.list);
Router.get("/blogs/:postId", BlogController.get);
Router.post("/blogs", BlogController.post);

export default Router;
