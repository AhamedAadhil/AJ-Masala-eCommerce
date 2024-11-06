import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.model.js";

dotenv.config();

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - no acces token provided" });
    }
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Unauthorized - user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const adminRoute = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Unauthorized - Admin only", success: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
