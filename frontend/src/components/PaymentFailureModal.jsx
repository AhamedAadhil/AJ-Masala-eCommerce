// PaymentFailureModal.jsx
import React from "react";
import { XCircle } from "lucide-react";

const PaymentFailureModal = ({ showModal, closeModal }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg text-center shadow-lg w-96">
        <XCircle size={48} className="mx-auto text-red-500" />
        <h2 className="text-2xl font-semibold text-red-600 mt-4">
          Payment Failed
        </h2>
        <p className="text-lg text-gray-700 mt-2">
          Something went wrong with your payment. Please try again.
        </p>
        <button
          onClick={closeModal}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentFailureModal;
