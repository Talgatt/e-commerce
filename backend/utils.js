import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
  const secretKey = process.env.TOKEN_SECRET || "secretKey";
  const token = jwt.sign(
    {
      email: user.email,
      name: user.name,
    },
    secretKey,

    { expiresIn: "10d" }
  );

  return token;
};

export default generateToken;
