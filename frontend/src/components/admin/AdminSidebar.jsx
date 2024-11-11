/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Package,
  User,
  Images,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  TicketCheck,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "../../stores/useUserStore";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const { logout } = useUserStore();

  const navigate = useNavigate();

  return (
    <div
      className={`bg-gray-800 text-white ${
        isOpen ? "w-64" : "w-16"
      } transition-all duration-300`}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="p-4">
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>
      <div className="flex flex-col items-start">
        <SidebarItem
          onClick={() => navigate("/admin")}
          icon={<Home />}
          label="Home"
          isOpen={isOpen}
          className="cursor-pointer"
        />
        <SidebarItem
          onClick={() => navigate("/admin/products")}
          icon={<Package />}
          label="Products"
          isOpen={isOpen}
          className="cursor-pointer"
        />
        <SidebarItem
          onClick={() => navigate("/admin/users")}
          icon={<User />}
          label="Users"
          isOpen={isOpen}
        />
        <SidebarItem
          onClick={() => navigate("/admin/orders")}
          icon={<ShoppingCart />}
          label="Orders"
          isOpen={isOpen}
        />
        <SidebarItem
          onClick={() => navigate("/admin/carousels")}
          icon={<Images />}
          label="Carousels"
          isOpen={isOpen}
        />
        <SidebarItem
          onClick={() => navigate("/admin/coupons")}
          icon={<TicketCheck />}
          label="Coupons"
          isOpen={isOpen}
        />
        <br />

        <SidebarItem
          onClick={() => logout(navigate)}
          icon={<LogOut />}
          label="Logout"
          isOpen={isOpen}
          className=" text-red-500"
        />
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, label, isOpen, onClick, className }) => (
  <div
    className={`p-4 hover:bg-gray-700 flex items-center cursor-pointer ${className}`}
    onClick={onClick}
  >
    {icon}
    {isOpen && <span className="ml-4">{label}</span>}
  </div>
);

export default Sidebar;
