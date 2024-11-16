/* eslint-disable react/prop-types */
// OrderPlacedModal.jsx

import { ShoppingCart } from "lucide-react";
import Confetti from "react-confetti";

const OrderPlacedModal = ({ showModal, closeModal, orderId }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <div className="bg-white p-6 rounded-lg text-center shadow-lg w-96">
        <ShoppingCart size={48} className="mx-auto text-blue-500" />
        <h2 className="text-2xl font-semibold text-blue-600 mt-4">
          Order Placed!
        </h2>
        <p className="text-lg text-gray-700 mt-2">
          Your order has been successfully placed. Thank you for shopping with
          us!
        </p>
        <div className="mt-4">
          <p className="text-lg text-gray-700">Your order ID is:</p>
          <p className="bg-blue-100 text-blue-600 font-semibold text-lg px-4 py-2 rounded-md mt-2 inline-block shadow-sm">
            {orderId}
          </p>
        </div>
        <button
          onClick={closeModal}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderPlacedModal;
