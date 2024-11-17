import toast from "react-hot-toast";
import { create } from "zustand";

import axios from "../lib/axios";

export const useOrderStore = create((set) => ({
  orderId: "",
  loading: false,
  orders: [],
  order: null,

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
    console.log("zustand orderId", orderId);
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
}));
