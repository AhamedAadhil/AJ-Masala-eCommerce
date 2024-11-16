import toast from "react-hot-toast";
import { create } from "zustand";

import axios from "../lib/axios";

export const useOrderStore = create((set) => ({
  orderId: "",
  loading: false,

  createOrder: async ({
    address,
    products,
    couponCode,
    paymentMethod,
    finalAmount,
  }) => {
    set({ loading: true, orderId: "" });
    try {
      const res = await axios.post("/order/create-order", {
        address,
        products,
        couponCode,
        paymentMethod,
        finalAmount,
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
}));
