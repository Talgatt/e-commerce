import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
      seller: req.body.orderItems[0].seller,
    });
    const createdOrder = await order.save();

    res.status(201).send({ message: "New Order Created", order: createdOrder });
  })
);

orderRouter.get(
  "/my",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    console.log(orders);
    res.send(orders);
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    // console.log(order);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;
