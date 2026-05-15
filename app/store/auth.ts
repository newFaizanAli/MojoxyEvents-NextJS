"use client";

import { create } from "zustand";

interface AuthState {
  user: {
    name: string;
    email: string;
  } | null;

  setUser: (user: AuthState["user"]) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),
}));

export default useAuthStore;
