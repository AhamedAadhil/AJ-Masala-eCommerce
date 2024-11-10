import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  users: [],
  user: null,
  loading: false,
  checkingAuth: true,
  error: null,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Password and Confirm Password must be the same");
    }
    try {
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({ loading: false, user: res.data.user });
      return toast.success(`Welcome ${res.data.user.name}`);
    } catch (error) {
      set({ error: error.response.data.message, loading: false });
      return toast.error(
        error.response.data.message || "An error occured, please try again"
      );
    }
  },
  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data.user, loading: false });
      return toast.success("Welcome Back");
    } catch (error) {
      set({ loading: false });
      return toast.error(
        error.response.data.message || "An error occured, please try again"
      );
    }
  },
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      console.log(error.response.data.message);
    }
  },
  logout: async () => {
    try {
      set({ loading: true });
      await axios.post("/auth/logout");
      set({ loading: false });
      set({ user: null });
      return toast.success("Logout success");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message || "An error occurred during logout"
      );
    }
  },
  getAllUsers: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/user/all");
      if (res && res.data.users) {
        set({ users: res.data.users, loading: false });
      } else {
        throw new Error("Users data is missing in the response.");
      }
    } catch (error) {
      set({ loading: false, users: [] });
      console.log(error.response.data.message);
    }
  },
  toggleUserStatus: async (userId) => {
    try {
      const res = await axios.patch(`/user/${userId}`);
      if (res && res.data.user) {
        const updatedUser = res.data.user;
        // Update the user in the users array with the toggled status
        set((state) => ({
          users: state.users.map((user) =>
            user._id === userId ? { ...user, status: updatedUser.status } : user
          ),
          loading: false,
        }));
        toast.success("User status toggled successfully");
      } else {
        toast.error("Failed to toggle user status");
        set({ loading: false });
      }
    } catch (error) {
      set({ loading: false });
      toast.error("Error toggling user status");
      console.log(error.response.data.message);
    }
  },
  refreshToken: async () => {
    if (get().checkAuth) return;

    set({ checkingAuth: true });
    try {
      const res = await axios.post("/auth/refresh-token");
      set({ checkingAuth: false });
      return res.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));
// axios interceptor for token refresh
let refreshPromise = null;
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // if refresh is already in progress, wait for it to complete
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }
        // start a new refresh process
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;
        return axios(originalRequest);
      } catch (refreshError) {
        // if refresh fails redirect to login or handle as needed
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
