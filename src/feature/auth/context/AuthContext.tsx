import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  login: (name: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName && storedUserName.trim()) {
          setUserName(storedUserName);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (name: string) => {
    const trimmedName = name.trim();
    if (trimmedName) {
      setUserName(trimmedName);
      setIsAuthenticated(true);
      localStorage.setItem("userName", trimmedName);
    }
  };

  const logout = () => {
    setUserName(null);
    setIsAuthenticated(false);
    localStorage.removeItem("userName");
  };

  const value = {
    isAuthenticated,
    userName,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
