/* AdminLayout.js */
import Sidebar from "../../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-max bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
