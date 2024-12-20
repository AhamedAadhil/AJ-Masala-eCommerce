/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ItemPreview = ({
  productId,
  name,
  price,
  originalPrice,
  rating,
  ratingCount,
  stock,
  imageUrl,
}) => {
  const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => {
        navigate(`/product/${productId}`);
      }}
      className="relative w-full bg-white rounded-2xl overflow-hidden shadow-lg mx-2 my-4 cursor-pointer"
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Badge for low stock */}
      {stock < 10 && (
        <div
          className={`absolute top-2 right-2 ${
            stock === 0 ? "bg-red-500" : "bg-yellow-500"
          }  text-white text-xs font-bold py-1 px-3 rounded-full shadow-md`}
        >
          {stock === 0 ? "Out of Stock" : "Low Stock"}
        </div>
      )}

      <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
      <div className="px-4 py-2">
        <h3 className="font-bold text-sm mb-1 truncate">{name}</h3>
        <div className="flex items-center text-sm mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
          <span>({ratingCount})</span>
        </div>
        <div className="flex items-baseline">
          <span className="text-gray-900 font-semibold text-lg">
            Rs. {price}
          </span>
          <span className="text-gray-500 text-sm line-through ml-2">
            Rs. {originalPrice}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemPreview;
