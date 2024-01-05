import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://kaimin134:m437226@recipe-cluster.zzrnh0z.mongodb.net/recipe-cluster?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("SERVER STARTED!"));
