import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../model/user.model.js";
import { generateTokens } from "../utils/generateTokens.js";
import { storeRefreshToken } from "../utils/storeRefreshToken.js";
import { setCookies } from "../utils/setCookies.js";
import { redis } from "../lib/redis.js";

dotenv.config();

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exist", success: false });
    }
    const user = new User({ name, email, password });
    await user.save();

    // generate tokens
    const { accessToken, refreshToken } = generateTokens(
      user._id,
      user.role,
      user.status
    );

    // store the tokens in redis db (cache)
    await storeRefreshToken(user._id, refreshToken);

    // set cookie with token
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully!",
      succes: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, succes: false });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not exists", success: false });
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", succss: false });
    }
    if (user.status !== "active") {
      return res.status(400).json({
        message: "Your account is hold, please contact admin",
        success: false,
      });
    }
    const { accessToken, refreshToken } = generateTokens(
      user._id,
      user.role,
      user.status
    );
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);
    user.lastLogin = new Date();
    await user.save();
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Login success",
      succss: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
      await redis.del(`refresh_token:${decoded.userId}`);
    }
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logout success", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(400)
        .json({ message: "No refresh token provided", success: false });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

    if (storedToken !== refreshToken) {
      return res
        .status(401)
        .json({ message: "Invalid refresh token", succss: false });
    }
    const accessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role, status: decoded.status },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res
      .status(201)
      .json({ message: "Token refreshed successfully ", succes: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, succss: false });
  }
};

export const getProfile = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
