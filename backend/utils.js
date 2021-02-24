import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user) => {
  const secretKey = process.env.JWT_SECRET || "somethingsecret";
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
    },
    secretKey,

    { expiresIn: "30d" }
  );

  return token;
};

export const isAuth = (req, res, next) => {
  console.log("Auth inside");
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    // Bearer XXXXXX
    console.log("token is: ", token);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          console.log("token is invalid", err);
          res.status(401).send({ message: "Invalid Token" });
        } else {
          console.log("decode ", decode);
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};
