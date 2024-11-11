import { Coupon } from "../model/coupon.model.js";

export const applyCouponToOrder = async (couponCode, totalAmount, user) => {
  const coupon = await Coupon.findOne({ code: couponCode });
  if (!coupon) {
    throw new Error("Invalid coupon code");
  }
  if (!coupon.isActive) {
    throw new Error("Coupon is inactive");
  }
  if (coupon.expirationDate < new Date()) {
    throw new Error("Coupon expired");
  }
  if (coupon.userId.includes(user._id)) {
    throw new Error("Coupon already used by this user");
  }

  // Apply the discount
  const discountAmount = coupon.discountAmount;
  const finalAmount = totalAmount - discountAmount;

  // Ensure the final amount is not negative
  if (finalAmount < 0) {
    throw new Error("Total amount after discount is invalid");
  }

  // Mark the coupon as used by this user
  coupon.userId.push(user._id);
  await coupon.save();

  return { finalAmount, discountAmount };
};
