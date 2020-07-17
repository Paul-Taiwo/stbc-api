import express from "express";

const Route = express.Router();

Route.get("/", (req, res) => {
  console.log("Heyyy", req.body);

  return res.status(200).json({
    status: 200,
    message: "Welcome to STBC API",
  });
});

export default Route;
