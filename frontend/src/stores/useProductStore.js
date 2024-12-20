import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  product: null,
  suggestProducts: [],
  loading: false,
  error: null,
  setProducts: (products) => set({ products }),

  createProduct: async (productData, navigate) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product added");
      navigate("/admin/products");
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
        error: `Failed fetch Product: ${error.response?.data?.message}`,
      });
      toast.error(error.response?.data?.message || "Failed to fetch product");
    }
  },
  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products");
      // console.log("res of fetchAllproducts ==", res);
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
      // console.log("product to delete", id);
      const res = await axios.delete(`/products/${id}`);
      if (res && res.data) {
        // console.log("response", res);
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
  updateProduct: async (productId, data = {}, fetchAllProducts, navigate) => {
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
        if (!Object.keys(data).includes("isFeatured")) {
          navigate("/admin/products");
        }
      } else {
        throw new Error("Product data is missing in the response.");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to update product");
      console.log(error.response?.data?.message);
    }
  },
  submitReview: async (productId, orderId, star, comment) => {
    set({ loading: true });
    try {
      const res = await axios.patch(
        `/products/review/${productId}/${orderId}`,
        {
          star,
          comment,
        }
      );
      if (res && res.data.success === true) {
        set({ loading: false });
        toast.success("Review submitted successfully");
        return true;
      } else {
        set({ loading: false });
        throw new Error("Failed to submit review");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to submit review");
      console.log(error.response?.data?.message);
      return false;
    }
  },
  fetchSuggestProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products/recommendations");
      set({ loading: false, suggestProducts: res.data.products });
    } catch (error) {
      set({
        loading: false,
        error: `Failed loading Products: ${error.response.data.message}`,
      });
      toast.error(error.response.data.message || "Failed to fetch products");
    }
  },
}));
