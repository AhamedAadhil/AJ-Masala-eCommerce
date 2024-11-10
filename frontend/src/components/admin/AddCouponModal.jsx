/* eslint-disable react/prop-types */
import { useState } from "react";
import { X } from "lucide-react"; // Importing the 'X' icon for closing the modal

function AddCouponModal({ show, handleClose, handleCreate }) {
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // Handle input changes
  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value.toUpperCase());
  };

  const handleDiscountAmountChange = (e) => {
    setDiscountAmount(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (couponCode && discountAmount && expiryDate) {
      // Ensure expiry date is not in the past
      const selectedDate = new Date(expiryDate);
      const currentDate = new Date();
      if (selectedDate < currentDate) {
        alert("Please select a future expiry date.");
        return;
      }
      handleCreate({
        code: couponCode,
        discountAmount,
        expirationDate: expiryDate,
      });
      handleClose();
    } else {
      alert("Please fill out all fields.");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New Coupon</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coupon Code
            </label>
            <input
              type="text"
              value={couponCode}
              onChange={handleCouponCodeChange}
              placeholder="Enter Coupon Code"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Amount
            </label>
            <input
              type="number"
              value={discountAmount}
              onChange={handleDiscountAmountChange}
              placeholder="Enter Discount Amount"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="date"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              min={new Date().toISOString().split("T")[0]} // Prevent past date selection
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Coupon
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCouponModal;
