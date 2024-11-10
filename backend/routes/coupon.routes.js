import express from "express";

import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import {
  applyCoupon,
  createCoupon,
  getAllCoupons,
  getCoupon,
  toggleCoponActive,
} from "../controller/coupon.controller.js";

const router = express.Router();

router.get("/:code", protectRoute, adminRoute, getCoupon);
router.get("/", protectRoute, adminRoute, getAllCoupons);
router.post("/", protectRoute, adminRoute, createCoupon);
router.patch("/apply/:code", protectRoute, applyCoupon);
router.patch("/toggle/:code", protectRoute, toggleCoponActive);

export default router;
