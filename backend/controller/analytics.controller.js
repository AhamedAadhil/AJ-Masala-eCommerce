import { getAnalyticsData } from "../utils/getAnalyticsData.js";
import { getDailySalesData } from "../utils/getDailySalesData.js";
import { getStockData } from "../utils/getStockData.js";
import { getTopUsersData } from "../utils/getTopUsersData.js";

export const analytics = async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData(); //dashboard card data

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days before

    const dailySalesData = await getDailySalesData(startDate, endDate);
    const topUsersData = await getTopUsersData();
    const stockData = await getStockData();
    return res
      .status(200)
      .json({ analyticsData, dailySalesData, stockData, topUsersData });
  } catch (error) {
    console.error("Error in analytics controller:", error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
