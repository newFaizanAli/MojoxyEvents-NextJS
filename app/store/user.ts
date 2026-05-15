import { create } from "zustand";
import { User } from "../types";
import axios from "../lib/axios_config";
import { API_ENDPOINTS } from "../utilities/api-endpoints";

interface AuthState {
  user: User | null;
  loading: boolean;

  fetchUser: () => Promise<void>;
}

export const useUserStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
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
