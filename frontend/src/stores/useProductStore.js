import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  product: null,
  loading: false,
  error: null,
  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      return toast.success("Product added");
    } catch (error) {
      toast.error(error.response.data.message);
      set({ loading: false });
    }
  },

  getSingleProduct: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/products/${productId}`);
      if (res && res.data) {
        set({ product: res.data.product, loading: false });
      } else {
        set({ product: null, loading: false });
      }
    } catch (error) {
      set({
        loading: false,
        error: `Failed fetch Product: ${error.response.data.message}`,
      });
      toast.error(error.response.data.message || "Failed to fetch product");
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products");
      set({ loading: false, products: res.data.products });
    } catch (error) {
      set({
        loading: false,
        error: `Failed loading Products: ${error.response.data.message}`,
      });
      toast.error(error.response.data.message || "Failed to fetch products");
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      console.log("product to delete", id);
      const res = await axios.delete(`/products/${id}`);
      if (res && res.data) {
        console.log("response", res);
        set((prevState) => ({
          products: prevState.products.filter((product) => product._id !== id),
          loading: false,
        }));
        toast.success("Product Deleted!");
      } else {
        throw new Error("Product deletion data is missing in the response.");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Failed to delete product");
    }
  },
  updateProduct: async (productId, data = {}, fetchAllProducts) => {
    try {
      set({ loading: true });

      const res = await axios.patch(`/products/${productId}`, data);

      if (res.data && res.data.product) {
        set((state) => ({
          products: state.products.map((product) =>
            product._id === productId
              ? { ...product, ...res.data.product }
              : product
          ),
          loading: false, // Turn off loading here after a successful update
        }));

        await fetchAllProducts();
        toast.success("Product updated successfully");
      } else {
        throw new Error("Product data is missing in the response.");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to update product");
    }
  },
}));
