import express from "express";

import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import {
  createOrder,
  checkOutSummary,
  getOrder,
  getOrderAdmin,
  updateOrder,
  getAllOrders,
} from "../controller/order.controller.js";

const router = express.Router();

router.post("/create-order", protectRoute, createOrder);
router.post("/checkout", protectRoute, checkOutSummary);
router.get("/admin/:id", protectRoute, adminRoute, getOrderAdmin);
router.get("/", protectRoute, getAllOrders);
router.get("/:id", protectRoute, getOrder);
router.patch("/:id", protectRoute, adminRoute, updateOrder);

export default router;
