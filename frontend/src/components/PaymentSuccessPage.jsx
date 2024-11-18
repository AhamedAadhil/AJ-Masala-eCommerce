import { CheckCircle } from "lucide-react";
import Confetti from "react-confetti";

import { useOrderStore } from "../stores/useOrderStore";

const PaymentSuccessPage = () => {
  const { orderId } = useOrderStore();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <div className="bg-white p-8 rounded-lg text-center shadow-lg w-96">
        <CheckCircle size={48} className="mx-auto text-green-500" />
        <h2 className="text-3xl font-semibold text-green-600 mt-4">
          Payment Successful!
        </h2>
        <p className="text-lg text-gray-700 mt-2">
          Your payment has been successfully processed.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Order ID: <span className="font-semibold text-black">{orderId}</span>
        </p>
        <button
          onClick={() => (window.location.href = "/")} // Redirect to homepage (or other page)
          className="mt-6 px-8 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
