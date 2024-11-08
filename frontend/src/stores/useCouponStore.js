import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useCouponStore = create((set) => ({
  coupons: [],
  coupon: null,
  loading: false,
  user: null,

  getAllCoupons: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/coupons");
      if (res && res.data) {
        set({ coupons: res.data.coupons, loading: false });
      } else {
        throw new Error("Coupon data is missing in the response.");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "Failed to fetch coupon data."
      );
    }
  },

  getCoupon: async (code) => {
    set({ loading: true });
    try {
      const res = await axios.get(`coupons/${code}`);
      if (res && res.data) {
        set({ coupon: res.data.coupon, loading: false });
      } else {
        throw new Error("Coupon data is missing in the response.");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "Failed to fetch coupon data."
      );
    }
  },

  createCoupon: async (couponData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/coupon", couponData);
      if (res && res.data.coupon) {
        set((prevData) => ({
          loading: false,
          coupons: [...prevData.coupons, res.data.coupon],
        }));
        toast.success("New coupon created");
      } else {
        throw new Error("Coupon creation failed.");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "Failed to create new coupon."
      );
    }
  },

  applyCoupon: async (code) => {
    set({ loading: true });
    try {
      const res = await axios.post(`/coupon/apply/${code}`);
      if (res && res.data) {
        set({ loading: false });
      }
      toast.success("Coupon applied");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Failed to apply coupon.");
    }
  },
}));
