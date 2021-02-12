import express from "express";
import data from "../data.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

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
    const email = req.body.email;
    const password = req.body.password;

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

    res.send({ user });
  })
);

export default userRouter;
