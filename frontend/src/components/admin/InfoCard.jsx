/* eslint-disable react/prop-types */
import { Package, User, DollarSign, ShoppingCart } from "lucide-react";

const icons = {
  package: Package,
  user: User,
  "dollar-sign": DollarSign,
  "shopping-cart": ShoppingCart,
};

function InfoCard({ title, value, icon, onClick }) {
  const Icon = icons[icon];
  return (
    <div
      className="bg-gray-700 text-white p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-600"
      onClick={onClick}
    >
      <div>
        <h3 className="text-lg">{title}</h3>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      <Icon size={32} />
    </div>
  );
}

export default InfoCard;
