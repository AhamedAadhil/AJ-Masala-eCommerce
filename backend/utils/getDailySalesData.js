import { Order } from "../model/order.model.js";

export const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySales = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $gte: startDate,
            $lte: endDate,
          },
          status: "delivered", // Assuming you filter for delivered orders only
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
          sales: { $sum: 1 }, // Count of delivered orders per day
          revenue: { $sum: "$totalAmount" }, // Sum of totalAmount per day
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const dateArray = getDatesInRange(startDate, endDate);

    return dateArray.map((date) => {
      const foundData = dailySales.find((item) => item._id === date);
      return {
        date,
        orders: foundData?.sales || 0,
        revenue: foundData?.revenue || 0,
      };
    });
  } catch (error) {
    console.error("Error in getDailySalesData:", error);
    throw new Error("Failed to fetch daily sales data");
  }
};
// example output of dailysalesdata function
//   [
// {
//     _id:"2024-08-14",
//     sales:2,
//     revenue:1233.00
// }
// ]

export function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
