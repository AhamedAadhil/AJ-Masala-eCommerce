import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateTokens = (userId, role, status) => {
  const accessToken = jwt.sign(
    { userId, role, status },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
  const refreshToken = jwt.sign(
    { userId, role, status },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};
