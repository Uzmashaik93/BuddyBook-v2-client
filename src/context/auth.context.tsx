import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  getToken: () => string | null;
  user?: AuthUser;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  getToken: () => null,
  user: undefined,
});

// provide the context
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") !== null //default value
  );

  const getToken = () => {
    return localStorage.getItem("auth");
  };

  const fetchUser = async () => {
    try {
      const token = getToken(); // Get token (or use cookies/session)

      if (!token) return;

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the response is ok (status code 200)

      if (response.status === 200) {
        const userData = response.data;
        setUser(userData);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user on mount
  }, []);

  // Login Function
  const login = (token: string) => {
    localStorage.setItem("auth", token);
    fetchUser(); // Fetch user data after login
    setIsAuthenticated(true);
  };

  // Log Out Function
  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, getToken, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
