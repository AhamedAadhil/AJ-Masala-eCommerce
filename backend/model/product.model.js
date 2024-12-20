import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ps: [
      {
        price: { type: Number, required: true },
        size: { type: String, required: true },
      },
    ],
    images: [
      {
        type: String,
        required: [true, "Image is required"],
      },
    ],
    stock: { type: Number, default: 1 },
    sold: { type: Number, default: 0 },
    category: { type: String, required: true },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: String,
    },
    overAllRating: Number,
    rating: [
      {
        star: Number,
        comment: String,
        user: String,
        orderId: String,
      },
    ],
    visibility: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
