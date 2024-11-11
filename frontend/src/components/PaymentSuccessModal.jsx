// PaymentSuccessModal.jsx
import React from "react";
import { CheckCircle } from "lucide-react";
import Confetti from "react-confetti";

const PaymentSuccessModal = ({ showModal, closeModal }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <div className="bg-white p-6 rounded-lg text-center shadow-lg w-96">
        <CheckCircle size={48} className="mx-auto text-green-500" />
        <h2 className="text-2xl font-semibold text-green-600 mt-4">
          Payment Successful!
        </h2>
        <p className="text-lg text-gray-700 mt-2">
          Your payment has been successfully processed.
        </p>
        <button
          onClick={closeModal}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
