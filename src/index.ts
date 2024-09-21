import express from "express";
import mongoose from "mongoose";
import studentsRouter from "./routers/students";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

// app.use((req, res, next) => {
//     //logic
//     next();
// })
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "*",
  })
);
app.use(express.json()); //middleware

mongoose
  .connect(
    process.env.MONGODB_CONNECT_URL || "mongodb://localhost:27017/students"
  )
  .then(() => console.log("connected"));

app.use("/students", studentsRouter);

app.listen(process.env.PORT || port, () =>
  console.log(`Running on port ${process.env.PORT}`)
);
