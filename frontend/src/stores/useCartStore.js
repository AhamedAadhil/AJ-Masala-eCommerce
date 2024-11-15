import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";

export const useCartStore = create((set) => ({
  cart: null,
  products: [],
  loading: false,
  error: null,
  totalAmount: 0,

  addToCart: async (productId, quantity, selectedPrice) => {
    set({ loading: true });
    try {
      const res = await axios.post("/cart", {
        productId,
        quantity,
        unitPrice: selectedPrice,
      });
      if (res && res.data) {
        set({ cart: res.data, loading: false });
        toast.success("Product added to cart");
      } else {
        set({ error: "Failed to add product to cart", loading: false });
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      set({ loading: false, error: error.message });
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while adding to cart"
      );
    }
  },
  checkOut: async (products, navigate) => {
    set({ loading: true });
    try {
      const res = await axios.post("/order/checkout", { products });
      console.log("res from  checkout", res);
      if (res && res.data) {
        set({
          loading: false,
          products: res.data.products,
          totalAmount: res.data.totalAmount,
        });
        navigate("/checkout");
      } else {
        set({ error: "Failed to get order summary", loading: false });
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      set({ loading: false, error: error.message });
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while getting order summary"
      );
    }
  },

  getUserCart: async () => {
    set({ loading: true, cart: null });
    try {
      const res = await axios.get("/cart");
      console.log("from get cart", res);
      if (res && res.data) {
        set({
          cart: res.data.products,
          totalAmount: res.data.totalAmount,
          loading: false,
        });
      } else {
        set({ error: "Failed to get cart", loading: false });
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      set({ loading: false, error: error.message });
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while fetching cart"
      );
    }
  },
}));
