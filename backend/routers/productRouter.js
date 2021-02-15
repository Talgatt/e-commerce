import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.products);

    //res.send("in seed");
    res.send({ createdProducts });
  })
);

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });

  //const product = data.products.find((x) => req.params.id === x._id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
});

productRouter.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

export default productRouter;
