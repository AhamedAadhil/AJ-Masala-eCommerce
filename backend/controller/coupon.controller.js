import { Coupon } from "../model/coupon.model.js";
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().populate("userId", "email");
    return res.status(200).json({ coupons, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getCoupon = async (req, res) => {
  try {
    const { code } = req.params;
    const coupon = await Coupon.findOne({ code }).populate("userId", "email");
    if (!coupon) {
      return res
        .status(404)
        .json({ message: "Coupon not exists", success: false });
    }
    return res.status(200).json({ coupon, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const createCoupon = async (req, res) => {
  try {
    const { code, discountAmount, expirationDate } = req.body;
    const couponExist = await Coupon.findOne({ code });
    if (couponExist) {
      return res
        .status(400)
        .json({ message: "Coupon Code already exists", success: false });
    }
    const coupon = await Coupon.create({
      code,
      discountAmount,
      expirationDate,
    });
    return res.status(201).json({ coupon, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const applyCoupon = async (req, res) => {
  try {
    const { code } = req.params;
    const { totalAmount } = req.body;
    const user = req.user;

    if (user.role === "admin") {
      return res.status(403).json({ message: "Access Denied", success: false });
    }

    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return res
        .status(404)
        .json({ message: "Coupon not exists", success: false });
    }
    if (coupon.isActive !== true) {
      return res
        .status(400)
        .json({ message: "Coupon is no more valid", success: false });
    }
    if (coupon.expirationDate < new Date()) {
      return res
        .status(400)
        .json({ message: "Coupon expired", success: false });
    }
    // Check if the user has already used this coupon
    if (coupon.userId.includes(user._id)) {
      return res
        .status(400)
        .json({ message: "Coupon already used by this user", success: false });
    }
    const newTotalAmount = totalAmount - coupon.discountAmount;
    if (newTotalAmount < 0) {
      return res.status(400).json({
        message: "Total amount after discount is invalid",
        success: false,
      });
    }
    // coupon.userId.push(user._id);
    // await coupon.save();
    return res.status(200).json({
      totalAmount: newTotalAmount,
      discountAmount: coupon.discountAmount,
      message: "Coupon Applied",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const toggleCoponActive = async (req, res) => {
  try {
    const { code } = req.params;
    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return res
        .status(404)
        .json({ message: "Coupon not exists", success: false });
    }
    coupon.isActive = !coupon.isActive; // toggle the active status
    await coupon.save();
    return res.status(200).json({ success: false, coupon });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
