// PaymentFailurePage.jsx
import { XCircle } from "lucide-react";

const PaymentFailurePage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg text-center shadow-lg w-96">
        <XCircle size={48} className="mx-auto text-red-500" />
        <h2 className="text-3xl font-semibold text-red-600 mt-4">
          Payment Failed
        </h2>
        <p className="text-lg text-gray-700 mt-2">
          Something went wrong with your payment. Please try again.
        </p>

        <button
          onClick={() => (window.location.href = "/")} // Redirect to homepage
          className="mt-4 px-8 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
