import User from "../model/user.model.js";
import { Order } from "../model/order.model.js";

export const getTopUsersData = async (topN = 10) => {
  try {
    const topUsers = await User.aggregate([
      // Match users who have at least one order in the orderHistory
      { $match: { orderHistory: { $exists: true, $not: { $size: 0 } } } },

      // Lookup orders from the Order collection
      {
        $lookup: {
          from: "orders", // Collection name of the `Order` model
          localField: "orderHistory",
          foreignField: "_id",
          as: "orders",
        },
      },

      // Unwind the orders array to process individual orders
      { $unwind: "$orders" },

      // Filter only delivered orders
      { $match: { "orders.status": "delivered" } },

      // Group by user and calculate total orders and purchase amount
      {
        $group: {
          _id: "$_id", // Group by user ID
          email: { $first: "$email" }, // Retain user email
          totalOrders: { $sum: 1 }, // Count delivered orders
          totalPurchase: { $sum: "$orders.totalAmount" }, // Sum totalAmount of delivered orders
        },
      },

      // Sort by total purchase in descending order
      { $sort: { totalPurchase: -1 } },

      // Limit to top N users
      { $limit: topN },
    ]);

    // Map results to desired structure
    return topUsers.map(({ _id, email, totalOrders, totalPurchase }) => ({
      userId: _id,
      email,
      totalOrders,
      totalPurchase,
    }));
  } catch (error) {
    console.error("Error fetching top users:", error);
    throw new Error("Failed to fetch top users");
  }
};
