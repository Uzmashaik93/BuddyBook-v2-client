import React, { createContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  getToken: () => string | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  getToken: () => null,
});

// provide the context
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") !== null //default value
  );

  const getToken = () => {
    return localStorage.getItem("auth");
  };

  // Login Function
  const login = (token: string) => {
    localStorage.setItem("auth", token);
    setIsAuthenticated(true);
  };

  // Log Out Function
  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
