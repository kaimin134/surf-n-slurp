import express from "express";
import mongoose from "mongoose";
import { ReviewModel } from "../models/Reviews.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await ReviewModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const review = new ReviewModel(req.body);
  try {
    const response = await review.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.body.reviewID);
    const user = await UserModel.findById(req.body.userID);
    user.savedReviews.push(review);
    await user.save();
    res.json({ savedReviews: user.savedReviews });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

// Get id of saved recipes
router.get("/savedReviews/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedReviews: user?.savedReviews });
  } catch (err) {
    res.json(err);
  }
});

// Get saved recipes
router.get("/savedReviews/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedReviews = await ReviewModel.find({
      _id: { $in: user.savedReviews },
    });
    res.json({ savedReviews });
  } catch (err) {
    res.json(err);
  }
});

export { router as reviewsRouter };
