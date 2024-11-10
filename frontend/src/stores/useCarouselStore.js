import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useCarouselStore = create((set) => ({
  carousels: [],
  carousel: null,
  loading: false,
  createLoading: false,

  createCarousel: async ({ image, url }) => {
    set({ carousel: null, createLoading: true });
    try {
      const res = await axios.post("/carousel", { image, url });
      if (res && res.data) {
        set({ carousel: res.data.carousel, createLoading: false });
        toast.success("Carousel created successfully");
      } else {
        throw new Error("Carousel data is missing in the response.");
      }
    } catch (error) {
      set({ createLoading: false });
      toast.error(
        error.response.data.message || "Failed to fetch carousel data."
      );
    }
  },

  getCarousels: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/carousel");
      if (res && res.data) {
        set({ carousels: res.data.carousels, loading: false });
      } else {
        throw new Error("Carousel datas missing in the response.");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "Failed to fetch carousel data."
      );
    }
  },

  deleteCarousel: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`/carousel/${id}`);
      if (res && res.data) {
        set((prevState) => ({
          carousels: prevState.carousels.filter(
            (carousel) => carousel._id !== id
          ),
          loading: false,
        }));
        toast.success("Carousel Deleted!");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Failed to delete carousel ");
    }
  },
}));
