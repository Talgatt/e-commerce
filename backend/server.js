import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import userRouter from "./routers/userRouters.js";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect("mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
