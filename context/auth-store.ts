import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as apiClient from "@/actions/auth";

interface User {
  access_token: string;
  username: string;
  fullname: string;
  role: string;
  profile_img: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  //
  setUser: (user: User | null) => void;
  //
  register: (fullname: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      //
      setUser: (user: User | null) => set({ user }), //
      //
      register: async (fullname: string, email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await apiClient.signup(fullname, email, password);
          set({ user: response, isLoading: false });
        } catch (error) {
          console.error("Failed to sign up:", error);
          set({ isLoading: false, error: "Failed to sign up" });
        }
      },
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await apiClient.login(email, password);
          set({ user: response, isLoading: false });
        } catch (error) {
          console.error("Failed to login:", error);
          set({ isLoading: false, error: "Failed to login" });
        }
      },
      logout: () => {
        set({ user: null, error: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
