import type { User } from "@/interface/types";

export type SsoProvider = "google" | "facebook";

export type AuthSession = {
  createdAt: string;
  provider?: "credentials" | SsoProvider;
  refreshToken?: string;
  token: string;
  user: User;
};

const SESSION_STORAGE_KEY = "angiagreen_session";
const USER_STORAGE_KEY = "angiagreen_user";
const TOKEN_STORAGE_KEY = "token";

const canUseStorage = () => typeof window !== "undefined";

const parseJson = <T>(value: string | null): T | null => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

export const isMockSsoToken = (token?: string | null) =>
  Boolean(token?.startsWith("mock-sso-"));

export function getAuthToken() {
  if (!canUseStorage()) {
    return null;
  }

  const session = parseJson<AuthSession>(sessionStorage.getItem(SESSION_STORAGE_KEY));
  return session?.token || localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function readAuthSession(): AuthSession | null {
  if (!canUseStorage()) {
    return null;
  }

  const session = parseJson<AuthSession>(sessionStorage.getItem(SESSION_STORAGE_KEY));
  if (session?.token && session.user) {
    return session;
  }

  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  const user = parseJson<User>(localStorage.getItem(USER_STORAGE_KEY));

  if (!token || !user) {
    return null;
  }

  const migratedSession: AuthSession = {
    createdAt: new Date().toISOString(),
    provider: "credentials",
    token,
    user,
  };
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(migratedSession));
  return migratedSession;
}

export function persistAuthSession(session: AuthSession) {
  if (!canUseStorage()) {
    return;
  }

  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(session.user));
  localStorage.setItem(TOKEN_STORAGE_KEY, session.token);
}

export function clearAuthSession() {
  if (!canUseStorage()) {
    return;
  }

  sessionStorage.removeItem(SESSION_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function createMockSsoSession(provider: SsoProvider): AuthSession {
  const now = Date.now();
  const providerName = provider === "google" ? "Google" : "Facebook";

  return {
    createdAt: new Date(now).toISOString(),
    provider,
    token: `mock-sso-${provider}-${now}`,
    user: {
      id: `sso-${provider}-demo`,
      name: `AN GIA GREEN ${providerName}`,
      email: `demo.${provider}@gmail.com`,
      membershipLevel: "member",
      points: 0,
      addresses: [],
      favoriteProductIds: [],
      paymentMethods: [],
    },
  };
}
