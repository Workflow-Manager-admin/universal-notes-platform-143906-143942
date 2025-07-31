import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

/**
 * AuthProvider: Handle login status, JWT token, and helper methods.
 *
 * State: { user, token, loading, error }
 */
// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}

function loadFromStorage() {
  const token = localStorage.getItem("token");
  const userstr = localStorage.getItem("user");
  return token && userstr
    ? { token, user: JSON.parse(userstr) }
    : { token: null, user: null };
}

// PUBLIC_INTERFACE
function AuthProvider({ children }) {
  const [token, setToken] = useState(() => loadFromStorage().token);
  const [user, setUser] = useState(() => loadFromStorage().user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Login user (fetch token + user info)
   * @param {*} email
   * @param {*} password
   * @returns
   */
  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await res.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
      return false;
    }
  };

  /**
   * Register new user.
   */
  const register = async ({ username, email, password }) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        throw new Error("Registration failed");
      }
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || "Registration failed");
      setLoading(false);
      return false;
    }
  };

  /**
   * Logout: Remove current token/state.
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, error, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
