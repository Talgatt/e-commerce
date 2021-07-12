import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import userRouter from "./routers/userRouters.js";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";
import path from "path";
import { resolveSoa } from "dns";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
//app.use('/api/uploads', uploadRouter)

app.get("/", (req, res) => {
  res.send("Server is ready");
});
app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || "");
});
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); //relative path
  });
}
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
