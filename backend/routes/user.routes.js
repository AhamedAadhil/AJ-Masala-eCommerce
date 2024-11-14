import express from "express";

import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  getUser,
  toggleUserStatus,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/all", protectRoute, adminRoute, getAllUsers);
router.get("/:id", protectRoute, getUser);
router.patch("/:id", protectRoute, adminRoute, toggleUserStatus);
export default router;
