"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authServices } from "@/services/authApi";
import { orderServices } from "@/services/orderApi";
import { userServices } from "@/services/userApi";
import type { Order, User } from "./types";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  orders: Order[];
  refreshOrders: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "angiagreen_user";
const TOKEN_STORAGE_KEY = "token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const persistSession = (nextUser: User, token?: string) => {
    setUser(nextUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));

    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
  };

  const clearSession = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  const refreshOrders = async () => {
    if (!localStorage.getItem(TOKEN_STORAGE_KEY)) {
      setOrders([]);
      return;
    }

    const nextOrders = await orderServices.getMy();
    setOrders(nextOrders);
  };

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      if (!token) {
        return;
      }

      try {
        const currentUser = await authServices.me();
        persistSession(currentUser);
        await refreshOrders();
      } catch {
        clearSession();
      }
    };

    restoreSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { user: nextUser, token } = await authServices.login({ email, password });
      persistSession(nextUser, token);
      await refreshOrders();
      return true;
    } catch {
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { user: nextUser, token } = await authServices.register({
        name,
        email,
        phone,
        password,
      });
      persistSession(nextUser, token);
      setOrders([]);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    clearSession();
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) {
      return;
    }

    const updatedUser = await userServices.updateMe(data);
    persistSession(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        register,
        logout,
        updateProfile,
        orders,
        refreshOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
