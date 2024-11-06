import express from "express";

import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import {
  applyCoupon,
  createCoupon,
  getAllCoupons,
  getCoupon,
} from "../controller/coupon.controller.js";

const router = express.Router();

router.get("/:code", protectRoute, adminRoute, getCoupon);
router.get("/", protectRoute, adminRoute, getAllCoupons);
router.post("/", protectRoute, adminRoute, createCoupon);
router.post("/apply/:code", protectRoute, applyCoupon);

export default router;
