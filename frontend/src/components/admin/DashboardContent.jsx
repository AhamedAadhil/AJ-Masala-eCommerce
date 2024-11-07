import InfoCard from "./InfoCard";
import SalesChart from "./SalesChart";
import OrderChart from "./OrderChart";
import UsersInfoTable from "./UsersInfoTable";
import ProductsInfoTable from "./ProductsInfoTable";

function DashboardContent() {
  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-4 gap-4">
        <InfoCard title="Total Products" value="20" icon="package" />
        <InfoCard title="Total Users" value="150" icon="user" />
        <InfoCard title="Total Sales" value="LKR. 101K" icon="dollar-sign" />
        <InfoCard title="Orders" value="22" icon="shopping-cart" />
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
