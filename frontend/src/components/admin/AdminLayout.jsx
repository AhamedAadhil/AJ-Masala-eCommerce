import { Outlet } from "react-router-dom";

/* AdminLayout.js */
import Sidebar from "../../components/admin/AdminSidebar";

const AdminLayout = () => {
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
