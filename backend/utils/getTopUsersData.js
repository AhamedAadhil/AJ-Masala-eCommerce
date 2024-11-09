import { Order } from "../model/order.model.js";

export const getTopUsersData = async () => {
  try {
    const topUsers = await Order.aggregate([
      {
        $match: {
          status: "delivered", // Only consider orders with 'delivered' status
        },
      },
      {
        $group: {
          _id: "$user", // Group by the user ID
          totalOrders: { $sum: 1 }, // Count the number of orders per user
          totalSpend: { $sum: "$totalAmount" }, // Sum the totalAmount for each user
        },
      },
      {
        $sort: { totalSpend: -1 }, // Sort users by totalSpend in descending order
      },
      {
        $limit: 15, // Limit to top 15 users
      },
      {
        $lookup: {
          from: "users", // Lookup from the 'users' collection
          localField: "_id", // Match on the user ID
          foreignField: "_id", // Match the foreign field '_id' in users collection
          as: "userInfo", // Alias for user data
        },
      },
      {
        $unwind: "$userInfo", // Flatten the userInfo array
      },
      {
        $project: {
          _id: 0, // Exclude the MongoDB internal _id field
          userName: "$userInfo.name",
          totalOrders: 1, // Include the totalOrders field
          totalSpend: 1, // Include the totalSpend field
        },
      },
    ]);
    return topUsers; // Return the list of top users with the requested fields
  } catch (error) {
    console.error("Error fetching top users:", error);
    throw new Error("Failed to fetch top users");
  }
};
