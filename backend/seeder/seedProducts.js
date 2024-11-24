import dotenv from "dotenv";
import mongoose from "mongoose";
import { Product } from "../model/product.model.js";
import { connectDB } from "../lib/db";

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();
    // Sample product data
    const products = [
      {
        name: "Product 1",
        description: "<p>This is the description for Product 1<p>",
        ps: [
          { price: 100, size: "100g" },
          { price: 150, size: "200g" },
        ],
        images: [
          "https://res.cloudinary.com/dlbf2dzyw/image/upload/v1732438363/1_lcxve1.jpg",
        ],
        category: "Spices",
        tags: "Tag1, Tag2",
      },
      {
        name: "Product 2",
        description: "<p>This is the description for Product 1<p>",
        ps: [
          { price: 200, size: "100g" },
          { price: 250, size: "200g" },
        ],
        images: [
          "https://res.cloudinary.com/dlbf2dzyw/image/upload/v1732438363/2_tpjc43.jpg",
        ],
        category: "Herbs",
        tags: "Tag2, Tag3",
      },
      {
        name: "Product 3",
        description: "<p>This is the description for Product 1<p>",
        ps: [
          { price: 300, size: "100g" },
          { price: 350, size: "200g" },
        ],
        images: [
          "https://res.cloudinary.com/dlbf2dzyw/image/upload/v1732438363/3_qpq6xs.jpg",
        ],
        category: "Grains",
        tags: "Tag1, Tag3",
      },
    ];

    // Insert products into the database
    for (const productData of products) {
      const product = new Product(productData);
      await product.save();
    }
    console.log("Products have been successfully seeded!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedProducts();
