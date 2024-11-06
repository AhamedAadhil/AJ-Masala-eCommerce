import { Coupon } from "../model/coupon.model.js";

export const applyCouponToOrder = async (userId, code) => {
  const coupon = await Coupon.findOne({ code });
  if (!coupon) {
    throw new Error("Coupon does not exist");
  }
  if (!coupon.isActive) {
    throw new Error("Coupon is no longer valid");
  }
  if (coupon.expirationDate < new Date()) {
    throw new Error("Coupon has expired");
  }
  // Add the user to the coupon's usage record
  coupon.userId.push(userId);
  await coupon.save();
  return coupon; // return coupon details if needed for discount calculation
};
