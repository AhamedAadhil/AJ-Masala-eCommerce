import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  users: [],
  user: null,
  loading: false,
  checkingAuth: true,
  error: null,
  totalSpent: 0,

  signup: async ({ name, email, password, confirmPassword }, onClose) => {
    set({ loading: true, error: null });
    if (password !== confirmPassword) {
      set({
        loading: false,
        error: "Password and Confirm Password must be the same",
      });
      return;
    }
    try {
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({ loading: false, user: res.data.user });
      onClose();
      return toast.success(`Welcome ${res.data.user.name}`);
    } catch (error) {
      set({ error: error.response.data.message, loading: false });
    }
  },
  login: async ({ email, password }, onClose) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data.user, loading: false });
      onClose();
      return toast.success("Welcome Back");
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      set({ loading: false, error: error.response.data.message });
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
  logout: async (navigate) => {
    try {
      set({ loading: true });
      const res = await axios.post("/auth/logout");
      if (res && res.data.success) {
        set({ loading: false });
        set({ user: null });
        toast.success("Logout success");
        navigate("/");
      } else {
        throw new Error(res.data.message || "An error occurred during logout");
      }
    } catch (error) {
      console.log(error.response.data.message);
      set({ loading: false });
      toast.error(error?.message || "An error occurred during logout");
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
  getUser: async (userId) => {
    set({ loading: true });
    try {
      const currentUser = get().user;
      if (currentUser && currentUser._id === userId) {
        const res = await axios.get(`/user/${userId}`);
        if (res && res.data.user) {
          set({
            user: res.data.user,
            loading: false,
            totalSpent: res.data.totalSpent,
          });
        } else {
          set({ loading: false });
          toast.error("Failed to fetch user data");
        }
      }
    } catch (error) {
      set({ loading: false });
      console.log(error.response?.data?.message || error.message);
      toast.error("Failed to fetch user data");
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
  sendMailToAdmin: async (formData) => {
    const { email, name, message } = formData;
    set({ loading: true });
    try {
      await axios.post("/user/send-mail", { email, name, message });
      set({ loading: false });
      return toast.success(`Query sent successfully`);
    } catch (error) {
      set({ loading: false });
      toast.error("Error sending mail");
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

axios.defaults.withCredentials = true;
