import { useEffect, useState } from "react";

import InfoCard from "./InfoCard";
import SalesChart from "./SalesChart";
import OrderChart from "./OrderChart";
import UsersInfoTable from "./UsersInfoTable";
import ProductsInfoTable from "./ProductsInfoTable";
import axios from "../../lib/axios";

function DashboardContent() {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setIsLoading(false);
      }
    };
    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-4 gap-4">
        <InfoCard
          title="Total Products"
          value={analyticsData?.products?.toLocaleString() || 0}
          icon="package"
        />
        <InfoCard
          title="Total Users"
          value={analyticsData?.users?.toLocaleString() || 0}
          icon="user"
        />
        <InfoCard
          title="Total Sales"
          value={analyticsData?.totalSales?.toLocaleString() || 0}
          icon="dollar-sign"
        />
        <InfoCard
          title="Orders"
          value={analyticsData?.totalRevenue?.toLocaleString() || 0}
          icon="shopping-cart"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <SalesChart />
        <OrderChart />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <UsersInfoTable />
        <ProductsInfoTable />
      </div>
    </div>
  );
}

export default DashboardContent;
