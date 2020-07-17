import express from "express";
import { BlogController } from '../controllers'

const Router = express.Router();

Router.post('/blogs', BlogController.post);
Router.get('/blogs', BlogController.list);

export default Router;