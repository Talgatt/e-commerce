import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import userRouter from "./routers/userRouters.js";
import productRouter from "./routers/productRouter.js";

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

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => req.params.id === x._id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
