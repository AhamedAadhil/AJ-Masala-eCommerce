import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Eye, EyeClosed } from "lucide-react"; // Import icons

import AddCouponModal from "../../components/admin/AddCouponModal";
import { useCouponStore } from "../../stores/useCouponStore";

const CouponList = () => {
  const [showModal, setShowModal] = useState(false);

  const { createCoupon, getAllCoupons, toggleCouponActive, coupons } =
    useCouponStore();

  console.log(coupons);

  const handleCreateCoupon = (couponData) => {
    createCoupon(couponData);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("expirationDate");
  const [expandedCouponId, setExpandedCouponId] = useState(null);

  const filteredCoupons = coupons?.filter((coupon) =>
    coupon?.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedCoupons = [...filteredCoupons].sort((a, b) => {
    if (orderBy === "expirationDate") {
      return parseInt(b.expirationDate) - parseInt(a.expirationDate);
    } else {
      return new Date(b.discountAmount) - new Date(a.discountAmount);
    }
  });

  useEffect(() => {
    getAllCoupons();
  }, [getAllCoupons]);

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg max-w-4xl mx-auto p-4">
      {/* Search bar and Order By dropdown */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center bg-gray-700 rounded-md px-3 py-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Coupons..."
            className="bg-transparent outline-none text-white placeholder-gray-400"
          />
        </div>
        <div>
          <label className="text-white mr-2">Order By:</label>
          <select
            className="bg-gray-700 text-white rounded-md p-2"
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
          >
            <option value="expirationDate">Expiration Date</option>
            <option value="discountAmount">Discount Amount</option>
          </select>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          + Add Coupon
        </button>

        <AddCouponModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleCreate={handleCreateCoupon}
        />
      </div>

      {/* Coupon Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Coupon Code
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Discount Amount
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Expiration Date
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-3 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">
                Action
              </th>
              <th className="px-3 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700 cursor-pointer">
            {sortedCoupons.map((coupon, index) => (
              <>
                <tr key={index} className="hover:bg-gray-700">
                  <td className="px-3 py-4">
                    <div className="text-sm font-medium text-white">
                      {coupon.code}
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <div className="text-sm text-white">
                      LKR {coupon.discountAmount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <div
                      className={`text-sm ${
                        new Date(coupon.expirationDate) > new Date()
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {
                        new Date(coupon.expirationDate)
                          .toISOString()
                          .split("T")[0]
                      }
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <div
                      className={`text-sm font-semibold ${
                        coupon.isActive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {coupon.isActive ? "Active" : "Inactive"}
                    </div>
                  </td>
                  <td className="px-3 py-4 text-right">
                    <button className="text-gray-400 hover:text-blue-500">
                      {coupon.isActive ? (
                        <Eye
                          onClick={() => toggleCouponActive(coupon?.code)}
                          className="h-5 w-5"
                        />
                      ) : (
                        <EyeClosed
                          onClick={() => toggleCouponActive(coupon?.code)}
                          className="h-5 w-5"
                        />
                      )}
                    </button>
                  </td>
                  <td className="px-3 py-4 text-right">
                    <button
                      onClick={() =>
                        setExpandedCouponId(
                          expandedCouponId === coupon._id ? null : coupon._id
                        )
                      }
                      className="text-gray-400 hover:text-blue-500"
                    >
                      {expandedCouponId === coupon._id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                </tr>
                {/* Render extra details directly below the row */}
                {expandedCouponId === coupon._id && (
                  <tr>
                    <td colSpan="6" className="px-3 py-4 bg-gray-700">
                      <div className="text-white">
                        <p>
                          <strong>Created on:</strong>{" "}
                          {coupon?.createdAt.split("T")[0]}
                        </p>
                        <p>
                          <strong>Used By:</strong>{" "}
                          {coupon?.userId?.map((user) => user.email).join(", ")}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponList;
