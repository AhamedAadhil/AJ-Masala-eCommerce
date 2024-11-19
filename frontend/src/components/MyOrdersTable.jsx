/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Check, ChevronDown, ChevronUp, Star } from "lucide-react";

import { useUserStore } from "../stores/useUserStore";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";
const MyOrdersTable = ({ orders }) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [reviews, setReviews] = useState({}); // Track ratings and comments for each product

  const { user } = useUserStore();
  const { submitReview } = useProductStore();

  const toggleRow = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  const handleStarClick = (orderId, productId, rating) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [orderId]: {
        ...prevReviews[orderId],
        [productId]: {
          ...(prevReviews[orderId]?.[productId] || {}),
          rating,
        },
      },
    }));
  };

  const handleCommentChange = (orderId, productId, comment) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [orderId]: {
        ...prevReviews[orderId],
        [productId]: {
          ...(prevReviews[orderId]?.[productId] || {}),
          comment,
        },
      },
    }));
  };

  const handleAddReview = (orderId, productId) => {
    const productReview = reviews[orderId]?.[productId] || {
      rating: 0,
      comment: "",
    };
    console.log(`Order ID: ${orderId}`);
    console.log(`Product ID: ${productId}`);
    console.log(`User Email: ${user.email}`);
    console.log(`Rating: ${productReview.rating}`);
    console.log(`Review: ${productReview.comment}`);
    if (productReview.rating > 0 && productReview.comment) {
      // Call API to submit the review if required
      submitReview(
        productId,
        orderId,
        productReview.rating,
        productReview.comment
      );

      console.log("perfect review");
    } else {
      toast.error(
        "Please provide a rating and comment before adding a review."
      );
    }
  };

  console.log(orders);

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
            {orders?.map((order, index) => (
              <React.Fragment key={index}>
                <tr className="border-b">
                  <td className="p-2 sm:p-3">{order?.orderId}</td>
                  <td className="p-2 sm:p-3">
                    {order?.orderDate?.split("T")[0]}
                  </td>
                  <td className="p-2 sm:p-3">{order?.totalAmount}</td>
                  <td className="p-2 sm:p-3">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm ${
                        order.status === "placed"
                          ? "bg-yellow-500"
                          : order.status === "inTransit"
                          ? "bg-blue-500"
                          : "bg-green-500"
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
                    <td colSpan="5" className="p-4 sm:p-6 bg-gray-50">
                      {/* Order Summary Details */}
                      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-200">
                        <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                          Order Summary
                        </h4>
                        <div className="space-y-2 text-sm sm:text-base text-gray-600">
                          <p>
                            <strong className="text-gray-800">
                              Coupon Applied:
                            </strong>{" "}
                            {order?.couponCode || "NO"}
                          </p>
                          <p>
                            <strong className="text-gray-800">
                              Payment Method:
                            </strong>{" "}
                            {order?.paymentMethod?.toUpperCase()}
                          </p>
                          <p>
                            <strong className="text-gray-800">
                              Paid Status:
                            </strong>{" "}
                            {order?.isPaid ? "Paid" : "Unpaid"}
                          </p>
                          {order?.trackingId && (
                            <p>
                              <strong className="text-gray-800">
                                Tracking ID:
                              </strong>{" "}
                              {order?.trackingId}
                            </p>
                          )}
                          {order?.trackingUrl && (
                            <p>
                              <strong className="text-gray-800">
                                Tracking URL:
                              </strong>{" "}
                              <a
                                href={order?.trackingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700"
                              >
                                {order?.trackingUrl}
                              </a>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Product Details */}
                      {order?.products?.map((product, i) => (
                        <div
                          key={i}
                          className="flex flex-col sm:flex-row items-start sm:items-center border-b pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0"
                        >
                          <img
                            src={product?.product?.images[0]}
                            alt="Product"
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg mr-4 mb-2 sm:mb-0"
                          />
                          <div className="flex-1 text-sm sm:text-base">
                            <h4 className="font-semibold text-gray-800">
                              {product?.product?.name}
                            </h4>
                            <p className="text-gray-600">
                              Quantity: X{product?.quantity}
                            </p>
                            <p className="text-gray-800 font-semibold">
                              LKR {product?.price?.toFixed(2)}
                            </p>
                          </div>
                          {order?.status === "delivered" ? (
                            Array.isArray(product?.product?.rating) &&
                            product?.product?.rating.some(
                              (review) => review.user === user.email
                            ) ? (
                              <span className="flex items-center mt-2 sm:mt-3 text-green-500 border-green-500 rounded py-2 text-sm font-semibold">
                                <Check size={20} /> Review added
                              </span>
                            ) : (
                              <div className="flex flex-col items-start sm:items-center mt-2 sm:mt-0 sm:w-2/5">
                                {/* Star Rating */}
                                <div className="flex items-center mb-2">
                                  {[...Array(5)].map((_, starIndex) => (
                                    <Star
                                      key={starIndex}
                                      size={16}
                                      className={`cursor-pointer ${
                                        reviews[order.orderId]?.[
                                          product.product._id
                                        ]?.rating > starIndex
                                          ? "text-yellow-500"
                                          : "text-gray-300"
                                      }`}
                                      onClick={() =>
                                        handleStarClick(
                                          order.orderId,
                                          product.product._id,
                                          starIndex + 1
                                        )
                                      }
                                    />
                                  ))}
                                </div>
                                {/* Feedback Input */}
                                <input
                                  type="text"
                                  placeholder="Leave a feedback"
                                  value={
                                    reviews[order.orderId]?.[
                                      product.product._id
                                    ]?.comment || ""
                                  }
                                  onChange={(e) =>
                                    handleCommentChange(
                                      order.orderId,
                                      product.product._id,
                                      e.target.value
                                    )
                                  }
                                  className="ml-2 border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                                />
                                <button
                                  onClick={() =>
                                    handleAddReview(
                                      order.orderId,
                                      product?.product?._id
                                    )
                                  }
                                  className="mt-2 sm:mt-3 text-white bg-green-500 border border-green-500 rounded px-4 py-2 text-sm font-semibold hover:bg-green-600 hover:border-green-600 transition duration-300"
                                >
                                  Add Review
                                </button>
                              </div>
                            )
                          ) : null}
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
