import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { reviewsRouter } from "./routes/reviews.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/reviews", reviewsRouter);

mongoose.connect(
  "mongodb+srv://kaimin134:m437226@recipe-cluster.zzrnh0z.mongodb.net/recipe-cluster?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("SERVER STARTED!"));
