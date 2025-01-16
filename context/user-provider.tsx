"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuthStore } from "./auth-store";

interface User {
  access_token: string;
  username: string;
  fullname: string;
  role: string;
  profile_img: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login_user: (userData: UserCredentials) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { user, login: user_login, logout: user_logout } = useAuthStore();

  useEffect(() => {
    // Ensure the persisted user state initializes properly
    setIsLoading(false);
  }, [user]);

  const login_user = async (userData: UserCredentials) => {
    try {
      await user_login(userData.email, userData.password);
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

  const logout = () => {
    user_logout();
  };

  const value = {
    user,
    isLoading,
    login_user,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
