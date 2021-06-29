import express from "express";
import data from "../data.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken, isAdmin, isAuth } from "../utils.js";

const userRouter = express.Router();

// userRouter.post("/signin", async (req, res) => {
//   const username = req.body.email;
//   const password = req.body.password;

//   console.log("testing server side ", username, password);
//   res.send("wow");
// });

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const user = await User.insertMany(data.user);

    res.send({ user });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(user),
        });
        return;
      }
    }
    {
      res.status(401).send({ message: "user not found" });
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });

    if (!userExists) {
      const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 7),
        name: req.body.name,
      });

      const newUser = await user.save();

      res.send({
        _id: newUser._id,
        name: newUser.name,
        isAdmin: newUser.isAdmin,
        isSeller: newUser.isSeller,
        password: newUser.password,
        token: generateToken(newUser),
      });
    }
    {
      res.status(409).send({ message: "user already exists" });
    }
  })
);

userRouter.get(
  "/list",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});

    if (users) {
      res.send(users);
    } else {
      res.status(401).send({ message: "No users found." });
    }
  })
);

userRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found." });
    }
  })
);

userRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.save({ _id: req.params.id });

    res.send(user);
  })
);

export default userRouter;
