import { useState } from "react";
import { Truck, ClipboardList, Package, DollarSign } from "lucide-react";

const UpdateOrder = () => {
  // Dummy data for design purposes
  const order = {
    orderId: "ORD123456",
    status: "inTransit",
    paymentMethod: "online",
    totalAmount: 120.99,
    orderDate: "2024-11-11",
    products: [
      {
        product: {
          name: "Product 1",
          images: ["https://via.placeholder.com/100"],
        },
        quantity: 2,
        price: 30,
        size: "M",
      },
      {
        product: {
          name: "Product 2",
          images: ["https://via.placeholder.com/100"],
        },
        quantity: 1,
        price: 60.99,
        size: "L",
      },
    ],
    trackingId: "TRACK12345",
    trackingUrl: "https://trackingurl.com/12345",
  };

  // State for the update form fields
  const [status, setStatus] = useState(order.status);
  const [trackingId, setTrackingId] = useState(order.trackingId);
  const [trackingUrl, setTrackingUrl] = useState(order.trackingUrl);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-gray-300">
      <h1 className="text-2xl font-bold mb-6 text-gray-100 flex items-center gap-2">
        <ClipboardList className="w-6 h-6 text-green-500" /> Order Details
      </h1>

      <div className="mb-8 p-4 bg-gray-700 rounded-md shadow-md">
        <p className="mb-1">
          <strong className="text-green-400">Order ID:</strong> {order.orderId}
        </p>
        <p className="mb-1">
          <strong className="text-green-400">Status:</strong> {order.status}
        </p>
        <p className="mb-1">
          <strong className="text-green-400">Payment Method:</strong>{" "}
          {order.paymentMethod}
        </p>
        <p className="mb-1">
          <strong className="text-green-400">Total Amount:</strong> $
          {order.totalAmount}
        </p>
        <p>
          <strong className="text-green-400">Order Date:</strong>{" "}
          {new Date(order.orderDate).toLocaleDateString()}
        </p>
      </div>

      <h2 className="text-xl font-bold mb-4 text-gray-100">Products</h2>
      <div className="space-y-4">
        {order.products.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 border border-gray-600 rounded-lg bg-gray-800 shadow"
          >
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="text-gray-300">
              <p className="font-semibold text-lg">{item.product.name}</p>
              <p className="text-sm">
                <strong className="text-green-400">Quantity:</strong>{" "}
                {item.quantity}
              </p>
              <p className="text-sm">
                <strong className="text-green-400">Price:</strong> ${item.price}
              </p>
              <p className="text-sm">
                <strong className="text-green-400">Size:</strong> {item.size}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4 text-gray-100 flex items-center gap-2">
        <Package className="w-6 h-6 text-green-500" /> Update Order
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-green-300 font-medium mb-1">
            Status
          </label>
          <select
            className="w-full border border-gray-600 rounded-md px-4 py-2 bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="placed">Placed</option>
            <option value="inTransit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="block text-green-300 font-medium mb-1">
            Tracking ID
          </label>
          <input
            type="text"
            className="w-full border border-gray-600 rounded-md px-4 py-2 bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-green-300 font-medium mb-1">
            Tracking URL
          </label>
          <input
            type="text"
            className="w-full border border-gray-600 rounded-md px-4 py-2 bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={trackingUrl}
            onChange={(e) => setTrackingUrl(e.target.value)}
          />
        </div>
        <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200">
          Update Order
        </button>
      </div>
    </div>
  );
};

export default UpdateOrder;
