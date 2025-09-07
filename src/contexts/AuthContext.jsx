import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Helper to create a fake JWT
  const createFakeJWT = (payload) => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const body = btoa(JSON.stringify(payload));
    const signature = "fake-signature"; // not real cryptography
    return `${header}.${body}.${signature}`;
  };

  // Predefined credentials for admin only
  const validCredentials = {
    admin: { username: "amresh yadav", password: "123456", role: "admin" },
  };

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          return decoded;
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
    return null;
  });

  const [error, setError] = useState(null);

  const login = (username, password, role) => {
    setError(null); // Clear previous errors
    if (role === "admin") {
      // Validate admin credentials
      const credential = validCredentials.admin;
      if (
        credential &&
        credential.username === username &&
        credential.password === password &&
        credential.role === role
      ) {
        const payload = {
          username,
          role,
          exp: Math.floor(Date.now() / 1000) + 3600, // 1-hour expiry
        };
        const token = createFakeJWT(payload);
        localStorage.setItem("token", token);
        setUser(payload);
      } else {
        setError("Invalid admin username or password");
      }
    } else if (role === "user") {
      // Accept any username and password for user role
      const payload = {
        username,
        role,
        exp: Math.floor(Date.now() / 1000) + 3600, // 1-hour expiry
      };
      const token = createFakeJWT(payload);
      localStorage.setItem("token", token);
      setUser(payload);
    } else {
      setError("Invalid role");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    if (user?.exp) {
      const timeLeft = user.exp * 1000 - Date.now();
      if (timeLeft > 0) {
        const timer = setTimeout(logout, timeLeft);
        return () => clearTimeout(timer);
      } else {
        logout();
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};