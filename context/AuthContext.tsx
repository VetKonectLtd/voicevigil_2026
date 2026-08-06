"use client";

import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useLoginAdmin, useLoginUser } from "@/lib/hooks";
import type { AuthUser } from "@/types";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<AuthUser>;
  loginadmin: (email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
  isLoading: boolean;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { mutateAsync: loginMutate } = useLoginUser();
  const { mutateAsync: loginMutateAdmin } = useLoginAdmin();

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("vv_auth");
      if (stored) {
        const { user: storedUser, token: storedToken } = JSON.parse(stored);
        setUser(storedUser);
        setToken(storedToken);
      }
    } catch {
      // ignore malformed storage
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<AuthUser> => {
    const response = await loginMutate({ email, password });

    console.log("FULL RESPONSE:", response);

    const signedInUser: AuthUser = {
      id: response?.data?.user_id ? String(response.data.user_id) : "0",
      firstName: response?.data?.first_name,
      lastName: response?.data?.last_name,
      email: response?.data?.email,
      role: response?.data?.u_type === 1 ? "admin" : "user",
    };

    const authToken = response.data.token;

    setUser(signedInUser);
    setToken(authToken);

    localStorage.setItem(
      "vv_auth",
      JSON.stringify({
        user: signedInUser,
        token: authToken,
      }),
    );

    return signedInUser;
  };

  const loginadmin = async (email: string, password: string): Promise<AuthUser> => {
    const response = await loginMutateAdmin({ email, password });

    const signedInUser: AuthUser = {
      id: response.data.user_id ? String(response.data.user_id) : "0",
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      role: "admin",
    };

    const authToken = response.data.token;

    setUser(signedInUser);
    setToken(authToken);

    localStorage.setItem(
      "vv_auth",
      JSON.stringify({
        user: signedInUser,
        token: authToken,
      }),
    );

    return signedInUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("vv_auth");
  };

  const value = useMemo(
    () => ({ user, token, login, logout, loginadmin, isLoading }),
    [user, token, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

// ─── Guard component ─────────────────────────────────────────────────────────

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace("/login");
    else if (user.role !== "admin") router.replace("/");
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1565C0] border-t-transparent" />
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  return <>{children}</>;
}
