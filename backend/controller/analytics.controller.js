import { getAnalyticsData } from "../utils/getAnalyticsData.js";
import { getDailySalesData } from "../utils/getDailySalesData.js";

export const analytics = async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData(); //dashboard card data

    const endDate = new Date();
    const startDate = new Date(
      endDate.getTime() - 7 * 24 * 24 * 60 * 60 * 1000
    ); // 7 days before

    const dailySalesData = await getDailySalesData(startDate, endDate);
    return res.status(200).json({ analyticsData, dailySalesData });
  } catch (error) {
    console.error("Error in analytics controller:", error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
