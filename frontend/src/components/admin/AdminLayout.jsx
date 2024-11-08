import { Outlet } from "react-router-dom";
import { useEffect } from "react";

/* AdminLayout.js */
import Sidebar from "../../components/admin/AdminSidebar";
import { useProductStore } from "../../stores/useProductStore";

const AdminLayout = () => {
  const { fetchAllProducts } = useProductStore();
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
