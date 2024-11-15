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
      const res = await axios.get("/coupon");
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
      const { discountAmount, code, expirationDate } = couponData;

      const res = await axios.post("/coupon", {
        discountAmount,
        code,
        expirationDate,
      });
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
      const res = await axios.patch(`/coupon/apply/${code}`);
      if (res && res.data) {
        set({ loading: false });
      }
      toast.success("Coupon applied");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Failed to apply coupon.");
    }
  },

  toggleCouponActive: async (code) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/coupon/toggle/${code}`);
      if (res && res.data) {
        set((prevData) => {
          // Update the coupons array with the toggled coupon status
          const updatedCoupons = prevData.coupons.map((coupon) => {
            if (coupon.code === code) {
              return { ...coupon, isActive: !coupon.isActive }; // Toggle the isActive field
            }
            return coupon;
          });
          toast.success(`Coupon toggled successfully`);
          // Return the updated state
          return {
            loading: false, // Indicate that the loading is finished
            coupons: updatedCoupons, // Set the new coupons array
          };
        });
      } else {
        toast.error("Failed to coupon status");
        set({ loading: false });
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Failed to toggle coupon.");
    }
  },
}));
