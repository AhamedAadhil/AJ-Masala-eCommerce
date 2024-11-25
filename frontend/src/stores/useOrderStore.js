import toast from "react-hot-toast";
import { create } from "zustand";

import axios from "../lib/axios";

export const useOrderStore = create((set) => ({
  orderId: "",
  loading: false,
  orders: [],
  order: null,
  payment: [],

  createOrder: async ({
    address,
    products,
    couponCode,
    paymentMethod,
    finalAmount,
    receipt,
  }) => {
    set({ loading: true, orderId: "" });
    try {
      const res = await axios.post("/order/create-order", {
        address,
        products,
        couponCode,
        paymentMethod,
        finalAmount,
        receipt,
      });
      if (res && res.data.success === true) {
        set({ orderId: res.data.orderId, loading: false });
        toast.success("Order placed");
        return true;
      } else {
        set({ loading: false, orderId: "" });
        toast.error("Failed to place order");
        return false;
      }
    } catch (error) {
      set({ loading: false, orderId: "" });
      toast.error(error.response.data.message || "Failed to place order");
      return false;
    }
  },

  getAllOrders: async () => {
    set({ loading: true, orderId: "" });
    try {
      const res = await axios.get("/order");
      if (res && res.data.success === true) {
        set({ orders: res.data.orders, loading: false });
      } else {
        set({ loading: false, orderId: "" });
      }
    } catch (error) {
      set({ loading: false, orderId: "" });
      toast.error(error.response.data.message || "Failed to get all orders");
      return false;
    }
  },

  updateOrder: async (orderId, status, trackingId, trackingUrl, isPaid) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/order/${orderId}`, {
        status,
        trackingId,
        trackingUrl,
        isPaid,
      });
      if (res && res.data.success === true) {
        set((state) => {
          const updatedOrders = state.orders.map((order) =>
            order.orderId === orderId
              ? { ...order, status, trackingId, trackingUrl, isPaid }
              : order
          );
          return { orders: updatedOrders, loading: false };
        });
        toast.success("Order updated");
        return true;
      } else {
        set({ loading: false });
        return false;
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Failed to update order");
      return false;
    }
  },
  getOrderAdmin: async (orderId) => {
    set({ loading: false, order: null });
    // console.log("zustand orderId", orderId);
    try {
      const res = await axios.get(`/order/admin/${orderId}`);
      if (res && res.data.success === true) {
        set({ order: res.data.order, loading: false });
        return true;
      } else {
        set({ loading: false, order: null });
        toast.error("Failed to get order");
        return false;
      }
    } catch (error) {
      set({ loading: false, order: null });
      toast.error(error.response.data.message || "Failed to get order");
      return false;
    }
  },

  payWithPayhere: async (user, amount, orderData, navigate) => {
    set({ loading: false, order: null });
    try {
      // Extract only the required data from orderData
      const { finalAmount, paymentMethod, address, products, couponCode } =
        orderData;
      const filteredOrderData = {
        finalAmount,
        paymentMethod,
        address,
        products,
        couponCode,
      };

      const res = await axios.post("/payhere/payment", {
        amount,
        user,
        address,
      });
      if (res && res.data.success === true) {
        // console.log("res data==", res.data);
        const payment = {
          sandbox: true,
          merchant_id: res.data.merchant_id, // From backend
          return_url: res.data.return_url, // From backend
          cancel_url: res.data.cancel_url, // From backend
          notify_url: res.data.notify_url, // From backend
          order_id: res.data.orderId, // From backend
          items: res.data.orderId, // Order ID or actual item data
          amount: amount, // From frontend (order data)
          currency: "LKR", // Static
          hash: res.data.hash, // From backend
          first_name: user?.name, // From frontend (user details)
          last_name: "", // From frontend (optional)
          email: user?.email, // From frontend (user details)
          phone: user?.phone, // From frontend (user details)
          address: address?.city, // From frontend (user details)
          city: address?.city || "", // From frontend (user details)
          country: "Sri Lanka", // Static
          custom_1: JSON.stringify(filteredOrderData),
          custom_2: user?._id,
        };

        // console.log("payment data==", payment);

        if (window.payhere) {
          // Handle the PayHere payment events
          window.payhere.onCompleted = function (orderId = res.data.orderId) {
            // console.log("Payment completed. OrderID:", orderId);

            set({ loading: false, order: null, orderId: orderId });
            navigate("/payment-success");
          };

          window.payhere.onDismissed = function () {
            // console.log("Payment dismissed");
            toast.error("Payment dismissed");
            set({ loading: false, order: null });
            navigate("/payment-cancel");
          };

          window.payhere.onError = function (error) {
            console.log("Error:", error);
            toast.error(
              `Error: ${error.message || "An error occurred during payment"}`
            );
            set({ loading: false, order: null });
          };

          // Start the payment process
          window.payhere.startPayment(payment);
        } else {
          toast.error("Payhere not found");
          set({ loading: false, order: null });
        }
      } else {
        set({ loading: false, order: null });
        toast.error("Failed to get hash");
        return false;
      }
    } catch (error) {
      set({ loading: false, order: null });
      toast.error(error.response.data.message || "Failed to get with payhere");
      return false;
    }
  },
}));
