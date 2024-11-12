import express from "express";

import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import {
  createCarousel,
  deleteCarousel,
  getAllCarousels,
} from "../controller/carousel.controller.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, createCarousel);
router.get("/", getAllCarousels);
router.delete("/:id", protectRoute, adminRoute, deleteCarousel);

export default router;
