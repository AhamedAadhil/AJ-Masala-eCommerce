import {
  Search,
  Edit,
  Truck,
  CreditCard,
  Landmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrderStore } from "../../stores/useOrderStore";

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("Date");
  const [currentPage, setCurrentPage] = useState(1);

  const { getAllOrders, orders, loading } = useOrderStore();
  const navigate = useNavigate();

  const itemsPerPage = 20;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Helper function to format the order date
  const formatOrderDate = (orderDate) => {
    const orderDateTime = new Date(orderDate);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Clear time parts for comparison
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);

    if (orderDateTime >= today) {
      return "Today";
    } else if (orderDateTime >= yesterday) {
      return "Yesterday";
    } else {
      return orderDateTime.toLocaleDateString(); // Format as a standard date
    }
  };

  // Filter orders based on search term and order by selection
  const filteredOrders = orders.filter((order) =>
    order?.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort orders based on the selected orderBy value (status or order date)
  const sortedOrders = filteredOrders.sort((a, b) => {
    if (orderBy === "Status") {
      return a.status.localeCompare(b.status); // Sort by status (placed, inTransit, delivered)
    } else if (orderBy === "Date") {
      return new Date(b.orderDate) - new Date(a.orderDate); // Sort by order date
    } else if (orderBy === "isPaid") {
      return b.isPaid - a.isPaid; // Sort by isPaid (true, false)
    } else if (orderBy === "PaymentMethod") {
      return b.paymentMethod.localeCompare(a.paymentMethod);
    }
    return 0;
  });

  const currentOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset currentPage to 1 when searchTerm changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg max-w-4xl mx-auto p-4">
      {/* Search bar and Order By dropdown */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center bg-gray-700 rounded-md px-3 py-2">
          <Search className="text-gray-400 h-5 w-5 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID..."
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
            <option value="Date">Order Date</option>
            <option value="Status">Status</option>
            <option value="isPaid">isPaid</option>
            <option value="PaymentMethod">Payment Method</option>
          </select>
        </div>
      </div>

      {/* Order Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Paid
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Order Date
              </th>
              <th className="px-3 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700 cursor-pointer">
            {currentOrders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="px-3 py-4 text-sm font-medium text-white">
                  {order?.orderId}
                </td>
                <td className="px-3 py-4 text-sm text-white">
                  {order?.user.email}
                </td>
                <td className="px-3 py-4 text-sm text-white">
                  LKR {order?.totalAmount.toFixed(2)}
                </td>
                <td
                  className={`px-3 py-4 text-sm font-semibold ${
                    order?.status === "placed"
                      ? "text-yellow-500"
                      : order?.status === "inTransit"
                      ? "text-blue-500"
                      : "text-green-500"
                  }`}
                >
                  {order?.status === "placed"
                    ? "Placed"
                    : order?.status === "inTransit"
                    ? "inTransit"
                    : "Delivered"}
                </td>
                <td className="px-3 py-4 text-sm text-white">
                  {order?.paymentMethod === "bank" ? (
                    <span className="flex items-center gap-1">
                      Bank <Landmark size={16} />
                    </span>
                  ) : order?.paymentMethod === "online" ? (
                    <span className="flex items-center gap-1">
                      Online <CreditCard size={16} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      COD <Truck size={16} />
                    </span>
                  )}
                </td>
                <td
                  className={`px-3 py-4 text-sm ${
                    order?.isPaid ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {order?.isPaid ? "Yes" : "No"}
                </td>
                <td className="px-3 py-4 text-sm text-white">
                  {formatOrderDate(order?.orderDate)}
                </td>
                <td className="px-3 py-4 text-right">
                  {/* <button
                    onClick={() => toggleOrderDetails(order?.orderId)}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    {expandedOrderId === order?.orderId ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button> */}
                  <button
                    // TODO: Have to change the URL dynamically
                    onClick={() =>
                      navigate(`/admin/update-order/${order?.orderId}`)
                    }
                    className="text-gray-400 hover:text-yellow-500 ml-2"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded ${
            currentPage === 1 ? "text-gray-400" : "text-white hover:bg-gray-700"
          }`}
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded ${
            currentPage === totalPages
              ? "text-gray-400"
              : "text-white hover:bg-gray-700"
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default OrderList;
