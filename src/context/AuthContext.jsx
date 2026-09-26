"use client";

import { createContext, useEffect, useState, useCallback } from "react";

export const AuthContext = createContext(null);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Reusable: fetches the current user profile and syncs auth state.
  // Called on mount, and can be called again after login (or anywhere
  // else auth state needs to be refreshed) instead of duplicating this fetch.
  const refreshUser = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/userprofile`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsAuthenticated(true);
        return data;
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setUser(null);
      setIsAuthenticated(false);
      return null;
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await refreshUser();
      setLoading(false);
    })();
  }, [refreshUser]);

  const logout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        refreshUser, // <-- call this after login to sync context state
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}