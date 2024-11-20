import express from "express";

import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  getUser,
  toggleUserStatus,
  sendQueryMailToAdmin,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/all", protectRoute, adminRoute, getAllUsers);
router.get("/:id", protectRoute, getUser);
router.patch("/:id", protectRoute, adminRoute, toggleUserStatus);
router.post("/send-mail", sendQueryMailToAdmin);
export default router;
