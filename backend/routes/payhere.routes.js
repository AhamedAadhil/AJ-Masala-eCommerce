import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  payherePayment,
  payhereNotify,
} from "../controller/payhere.controller.js";

const router = express.Router();

router.post("/payment", protectRoute, payherePayment);
router.post("/payment/notify", payhereNotify);

export default router;
