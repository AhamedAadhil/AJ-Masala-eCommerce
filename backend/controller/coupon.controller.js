import { Coupon } from "../model/coupon.model.js";
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().populate("user");
    return res.status(200).json({ coupons, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getCoupon = async (req, res) => {
  try {
    const { code } = req.params;
    const coupon = await Coupon.findOne({ code }).populate("user");
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
    const { code, discount, expirationDate } = req.body;
    const coupon = await Coupon.create({ code, discount, expirationDate });
    return res.status(201).json({ coupon, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const applyCoupon = async (req, res) => {
  try {
    const { code } = req.params;
    const user = req.user;
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

    coupon.userId.push(user._id);
    await coupon.save();
    return res.status(200).json({ message: "Coupon Applied", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
