"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authServices } from "@/services/authApi";
import { orderServices } from "@/services/orderApi";
import { userServices } from "@/services/userApi";
import {
  clearAuthSession,
  createMockSsoSession,
  getAuthToken,
  isMockSsoToken,
  persistAuthSession,
  readAuthSession,
  type AuthSession,
  type SsoProvider,
} from "@/lib/authSession";
import type { Order, User } from "../interface/types";

interface AuthContextType {
  user: User | null;
  hasSession: boolean;
  isLoggedIn: boolean;
  isSessionLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithSso: (provider: SsoProvider) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  orders: Order[];
  refreshOrders: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  const persistSession = (nextUser: User, session?: Partial<AuthSession>) => {
    const token = session?.token || sessionToken || getAuthToken();

    if (!token) {
      setUser(nextUser);
      return;
    }

    const nextSession: AuthSession = {
      createdAt: session?.createdAt || new Date().toISOString(),
      provider: session?.provider || "credentials",
      refreshToken: session?.refreshToken,
      token,
      user: nextUser,
    };

    setUser(nextUser);
    setSessionToken(token);
    persistAuthSession(nextSession);
  };

  const clearSession = () => {
    setUser(null);
    setOrders([]);
    setSessionToken(null);
    clearAuthSession();
  };

  const refreshOrders = async () => {
    const token = getAuthToken();

    if (!token || isMockSsoToken(token)) {
      setOrders([]);
      return;
    }

    try {
      const nextOrders = await orderServices.getMy();
      setOrders(nextOrders);
    } catch {
      setOrders([]);
    }
  };

  useEffect(() => {
    const restoreSession = async () => {
      const savedSession = readAuthSession();

      if (!savedSession?.token) {
        clearSession();
        setIsSessionLoading(false);
        return;
      }

      setUser(savedSession.user);
      setSessionToken(savedSession.token);

      if (isMockSsoToken(savedSession.token)) {
        setIsSessionLoading(false);
        return;
      }

      try {
        const currentUser = await authServices.me();
        persistSession(currentUser, savedSession);
        await refreshOrders();
      } catch {
        clearSession();
      } finally {
        setIsSessionLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authServices.login({ email, password });
      const token = response.token || response.accessToken;

      if (!token) {
        return false;
      }

      persistSession(response.user, {
        provider: "credentials",
        refreshToken: response.refreshToken,
        token,
      });
      await refreshOrders();
      return true;
    } catch {
      return false;
    }
  };

  const loginWithSso = async (provider: SsoProvider): Promise<boolean> => {
    try {
      const response = await authServices.loginWithSso({
        provider,
        redirectUri: typeof window !== "undefined" ? window.location.origin : undefined,
      });
      const token = response.token || response.accessToken;

      if (!token) {
        throw new Error("Missing SSO token");
      }

      persistSession(response.user, {
        provider,
        refreshToken: response.refreshToken,
        token,
      });
      await refreshOrders();
      return true;
    } catch {
      const mockSession = createMockSsoSession(provider);
      persistSession(mockSession.user, mockSession);
      setOrders([]);
      return true;
    }
  };

  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await authServices.register({
        name,
        email,
        phone,
        password,
      });
      const token = response.token || response.accessToken;

      if (!token) {
        return false;
      }

      persistSession(response.user, {
        provider: "credentials",
        refreshToken: response.refreshToken,
        token,
      });
      setOrders([]);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    const session = readAuthSession();
    if (session?.refreshToken && !isMockSsoToken(session.token)) {
      authServices.logout({ refreshToken: session.refreshToken }).catch(() => {});
    }
    clearSession();
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) {
      return;
    }

    const updatedUser = await userServices.updateMe(data);
    persistSession(updatedUser);
  };

  const hasSession = Boolean(sessionToken);

  return (
    <AuthContext.Provider
      value={{
        user,
        hasSession,
        isLoggedIn: Boolean(user && hasSession),
        isSessionLoading,
        login,
        loginWithSso,
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
