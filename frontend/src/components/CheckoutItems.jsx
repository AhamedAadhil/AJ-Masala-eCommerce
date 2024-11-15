/* eslint-disable react/prop-types */

import { Trash2 } from "lucide-react";

const CartItem = ({ product }) => {
  return (
    <div className="flex items-center py-4 space-x-4 border-b border-gray-300">
      {/* Product Image */}
      <div className="w-16 h-16 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.quantity}x</p>
        <p className="text-lg font-normal text-gray-800">
          Rs. {product.unitPrice}
        </p>
      </div>

      {/* Delete Button */}
      <button className="text-red-600 hover:text-red-800">
        <Trash2 size={20} />
      </button>
    </div>
  );
};

const CheckoutItems = ({ products }) => {
  // console.log("products from Checkout items", products);
  if (!products) {
    // If products is null, set it to an empty array
    products = [];
  }
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg sm:max-w-lg md:max-w-xl lg:max-w-2xl dark:bg-white">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-900 mb-4">
        Cart Items
      </h2>

      {products.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CheckoutItems;
