/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Package,
  User,
  Images,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

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
        <SidebarItem icon={<Images />} label="Carousel" isOpen={isOpen} />
        <SidebarItem icon={<Settings />} label="Account" isOpen={isOpen} />
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, label, isOpen, onClick }) => (
  <div
    className="p-4 hover:bg-gray-700 flex items-center cursor-pointer"
    onClick={onClick}
  >
    {icon}
    {isOpen && <span className="ml-4">{label}</span>}
  </div>
);

export default Sidebar;
