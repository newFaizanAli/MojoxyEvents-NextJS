import { create } from "zustand";
import { User } from "../types";
import axios from "../lib/axios_config";
import { API_ENDPOINTS } from "../utilities/api-endpoints";
import { toastError, toastSuccess } from "../utilities/toast_utils";

interface AuthState {
  user: User | null;
  users: User[];
  loading: boolean;
  fetchUsers: (searchText?: string) => Promise<void>;
  addUser: (user: User) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  fetchUserById: (id: string) => Promise<User | null>;
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

  fetchUserById: async (id: string) => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.MAIN.USER?.BY_ID(id)}`);

      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch user");
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

  addUser: async (user) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS?.MAIN?.USER?.BASE}`,
        user,
      );

      const newUser = response.data;

      if (newUser.success) {
        toastSuccess(newUser.message || "User added successfully");

        set((state) => ({
          users: [...state.users, newUser.data],
        }));
      } else {
        toastError(newUser.message || "Failed to add user");
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to add user");
    }
  },

  updateUser: async (id, user) => {
    try {
      const resp = await axios.put(
        `${API_ENDPOINTS?.MAIN.USER.BY_ID(id)}`,
        user,
      );

      if (resp.data.success) {
        toastSuccess(resp.data.message || "User updated successfully");
        set((state) => ({
          users: state.users.map((u) =>
            String(u._id) === String(id) ? { ...u, ...user } : u,
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to update user");
    }
  },

  deleteUser: async (id) => {
    try {
      const resp = await axios.delete(
        `${API_ENDPOINTS?.MAIN?.USER?.BY_ID(id)}`,
      );

      if (resp.data.success) {
        toastSuccess(resp.data.message || "User deleted successfully");

        set((state) => ({
          users: state.users.filter((u) => String(u._id) !== String(id)),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to delete user");
    }
  },
}));
