import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";

export const useCartStore = create((set) => ({
  cart: null,
  products: [],
  loading: false,
  error: null,

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
}));
