// File: Capstone Project/frontend/blog/src/store/authStore.js | Description: auth Store
import { create } from "zustand";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;
export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  login: async (userCred) => {
  try {
    set({ loading: true, error: null });

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      userCred,
      { withCredentials: true }
    );

    console.log("LOGIN RESPONSE:", res.data);

    set({
      currentUser: res.data.payload, // ✅ FIXED
      isAuthenticated: true,
      loading: false,
    });

    return res.data.payload;
  } catch (err) {
    set({
      error: err.response?.data?.message || "Login failed",
      loading: false,
      isAuthenticated: false,
    });

    throw err;
  }
},
  logout: async () => {
    try {
      //set loading state
      //make logout api req
      let res = await axios.get(`${API}/auth/logout`, { withCredentials: true });
      //update state
      if (res.status === 200) {
        set({
          currentUser: null,
          isAuthenticated: false,
          error: null,
          loading: false,
        });
      }
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || "Logout failed",
      });
    }
  },
  // restore login
  checkAuth: async () => {
    try {
      set({ loading: true });
      const res = await axios.get(`${API}/auth/check-auth`, { withCredentials: true });

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      // If user is not logged in → do nothing
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
        });
        return;
      }

      // other errors
      console.error("Auth check failed:", err);
      set({ loading: false });
    }
  },
}));