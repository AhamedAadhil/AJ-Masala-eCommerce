import { Search, ChevronDown, ChevronUp, Edit } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("Status");
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const navigate = useNavigate();

  const orders = [
    // Sample order data; replace with actual data
    {
      id: "AJ-COD-12345",
      email: "ahamedaathil5@gmail.com",
      amount: 10000,
      status: "placed",
      paymentMethod: "ONLINE",
      paid: "No",
      date: "2024-11-12",
    },
    {
      id: "AJ-COD-12346",
      email: "ahamedaathil5@gmail.com",
      amount: 10000,
      status: "on the way",
      paymentMethod: "COD",
      paid: "Yes",
      date: "2024-11-12",
    },
    // Add more sample orders
  ];

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

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
            <option value="Status">Status</option>
            <option value="Date">Order Date</option>
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
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="px-3 py-4 text-sm font-medium text-white">
                  {order.id}
                </td>
                <td className="px-3 py-4 text-sm text-white">{order.email}</td>
                <td className="px-3 py-4 text-sm text-white">{order.amount}</td>
                <td className="px-3 py-4 text-sm font-semibold text-green-500">
                  {order.status}
                </td>
                <td className="px-3 py-4 text-sm text-white">
                  {order.paymentMethod}
                </td>
                <td className="px-3 py-4 text-sm text-white">{order.paid}</td>
                <td className="px-3 py-4 text-sm text-white">{order.date}</td>
                <td className="px-3 py-4 text-right">
                  <button
                    onClick={() => toggleOrderDetails(order.id)}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    {expandedOrderId === order.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    //   TODO: Have to change the URL dynamically
                    onClick={() => navigate(`/admin/update-order`)}
                    className="text-gray-400 hover:text-blue-500 ml-2"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
