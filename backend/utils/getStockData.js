import { Product } from "../model/product.model.js";

export const getStockData = async () => {
  try {
    const products = await Product.find({}).select("name stock");
    return products;
  } catch (error) {
    console.error("Error in getStockData:", error);
    throw new Error("Failed to fetch Stock Data");
  }
};
