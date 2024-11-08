import { Product } from "../model/product.model.js";
import User from "../model/user.model.js";
import { Order } from "../model/order.model.js";

export const getAnalyticsData = async () => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    // Log salesData to ensure it's retrieved correctly
    console.log("Sales Data:", salesData);

    // Fallback if salesData array is empty
    const { totalSales = 0, totalRevenue = 0 } = salesData[0] || {};

    return {
      users: totalUsers,
      products: totalProducts,
      totalSales,
      totalRevenue,
    };
  } catch (error) {
    console.error("Error in getAnalyticsData:", error);
    throw new Error("Failed to fetch analytics data");
  }
};
