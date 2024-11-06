import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { placeOrder } from "../controller/order.controller.js";

const router = express.Router();

router.post("/place-order", protectRoute, placeOrder);

export default router;
