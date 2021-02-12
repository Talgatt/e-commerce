import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

const generateToken = (user) => {
  const secretKey = process.env.TOKEN_SECRET || "secretKey";
  const token = jwt.sign({});
};

export default generateToken;
