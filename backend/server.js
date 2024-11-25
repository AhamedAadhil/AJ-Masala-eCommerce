import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRotes from "./routes/product.routes.js";
import carouselRoutes from "./routes/carousel.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import orderRoutes from "./routes/order.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import payhereRoutes from "./routes/payhere.routes.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5432;

const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json({ limit: "50mb" })); //allow parse body of req
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRotes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/payhere", payhereRoutes);

// Default "/" route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
//   });
// }

app.listen(PORT, () => {
  console.log(`Server is Up on http://localhost:${PORT}`);
  connectDB();
});
