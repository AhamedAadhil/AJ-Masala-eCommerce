import express from "express";
import {
  getCartProducts,
  addToCart,
  removeProductFromCart,
  updateQuantity,
} from "../controller/cartController.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart);
router.patch("/", protectRoute, removeProductFromCart);
router.patch("/:productId", protectRoute, updateQuantity);

export default router;
