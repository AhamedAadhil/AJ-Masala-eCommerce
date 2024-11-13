import React, { useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";

const MyOrdersTable = () => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [reviews, setReviews] = useState({}); // Track ratings and comments for each product

  const toggleRow = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  const handleStarClick = (orderId, productIndex, rating) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [orderId]: {
        ...prevReviews[orderId],
        [productIndex]: {
          ...prevReviews[orderId]?.[productIndex],
          rating,
        },
      },
    }));
  };

  const handleCommentChange = (orderId, productIndex, comment) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [orderId]: {
        ...prevReviews[orderId],
        [productIndex]: {
          ...prevReviews[orderId]?.[productIndex],
          comment,
        },
      },
    }));
  };

  const handleAddReview = (orderId, productIndex) => {
    const productReview = reviews[orderId]?.[productIndex];
    if (productReview) {
      console.log(`Order ID: ${orderId}, Product Index: ${productIndex}`);
      console.log(`Rating: ${productReview.rating || 0}`);
      console.log(`Comment: ${productReview.comment || ""}`);
    } else {
      console.log("No review data available.");
    }
  };

  const orders = [
    {
      id: "ODR-COD-1256",
      date: "2023-10-15",
      product: "AJ Garam Masala",
      coupon: "AJ6842",
      amount: "Rs. 2560",
      status: "Successful",
      products: [
        { name: "AJ masala product 323", price: "Rs. 670", quantity: "1 Kg" },
        { name: "AJ masala product 323", price: "Rs. 670", quantity: "1 Kg" },
      ],
    },
    {
      id: "ODR-COD-1256",
      date: "2023-10-15",
      product: "AJ Garam Masala",
      coupon: "AJ6855",
      amount: "Rs. 2560",
      status: "Pending",
      products: [
        { name: "AJ masala product 323", price: "Rs. 670", quantity: "1 Kg" },
      ],
    },
  ];

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 sm:p-3 text-left">Order ID</th>
              <th className="p-2 sm:p-3 text-left">Order date</th>
              <th className="p-2 sm:p-3 text-left">Amount</th>
              <th className="p-2 sm:p-3 text-left">Status</th>
              <th className="p-2 sm:p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <React.Fragment key={index}>
                <tr className="border-b">
                  <td className="p-2 sm:p-3">{order.id}</td>
                  <td className="p-2 sm:p-3">{order.date}</td>
                  <td className="p-2 sm:p-3">{order.amount}</td>
                  <td className="p-2 sm:p-3">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm ${
                        order.status === "Successful"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-2 sm:p-3">
                    <button
                      onClick={() => toggleRow(index)}
                      className="flex items-center text-blue-600"
                    >
                      {expandedRows.includes(index) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </td>
                </tr>
                {expandedRows.includes(index) && (
                  <tr className="border-b">
                    <td colSpan="5" className="p-2 sm:p-3 bg-gray-50">
                      {order.products.map((product, i) => (
                        <div
                          key={i}
                          className="flex flex-col sm:flex-row items-start sm:items-center border-b pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0"
                        >
                          <img
                            src="https://via.placeholder.com/50"
                            alt="Product"
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg mr-0 sm:mr-3 mb-2 sm:mb-0"
                          />
                          <div className="flex-1 text-xs sm:text-sm">
                            <h4 className="font-semibold">{product.name}</h4>
                            <p className="text-gray-600">{product.quantity}</p>
                            <p className="text-gray-800 font-semibold">
                              {product.price}
                            </p>
                            <div className="flex items-center mt-2">
                              {[...Array(5)].map((_, starIndex) => (
                                <Star
                                  key={starIndex}
                                  size={14}
                                  className={`cursor-pointer ${
                                    reviews[order.id]?.[i]?.rating > starIndex
                                      ? "text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                  onClick={() =>
                                    handleStarClick(order.id, i, starIndex + 1)
                                  }
                                />
                              ))}
                              <input
                                type="text"
                                placeholder="Feedback"
                                value={reviews[order.id]?.[i]?.comment || ""}
                                onChange={(e) =>
                                  handleCommentChange(
                                    order.id,
                                    i,
                                    e.target.value
                                  )
                                }
                                className="ml-2 border border-gray-300 rounded px-1 py-1 w-full max-w-xs sm:max-w-sm focus:outline-none focus:border-blue-400 text-xs sm:text-sm"
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => handleAddReview(order.id, i)}
                            className="text-green-500 border border-green-500 rounded px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold hover:bg-green-500 hover:text-white transition mt-2 sm:mt-0"
                          >
                            Add Review
                          </button>
                        </div>
                      ))}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersTable;
