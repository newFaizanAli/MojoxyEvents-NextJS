import { create } from "zustand";
import { User } from "../types";
import axios from "../lib/axios_config";
import { API_ENDPOINTS } from "../utilities/api-endpoints";
import { toastError } from "../utilities/toast_utils";

interface AuthState {
  user: User | null;
  users: User[];
  loading: boolean;
  fetchUsers: (searchText?: string) => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

export const useUserStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  users: [],

  fetchUsers: async (searchText = "") => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS?.MAIN.USER?.BASE}?search=${searchText}`,
      );

      const fetchedUsers = response.data.data;

      set({ users: fetchedUsers });
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch users");
    }
  },

  fetchCurrentUser: async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.AUTH.ME);

      if (!res.data.success) {
        set({ user: null, loading: false });
      }

      set({ user: res.data.user, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },
}));
