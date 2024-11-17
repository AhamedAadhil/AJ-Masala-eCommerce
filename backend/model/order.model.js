import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["placed", "inTransit", "delivered", "cancelled"],
      required: true,
      default: "placed",
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "cod",
      enum: ["cod", "online", "bank"],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    couponCode: { type: String, default: "" },
    trackingId: {
      type: String,
    },
    trackingUrl: {
      type: String,
    },
    receipt: {
      type: String,
      default: "",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
