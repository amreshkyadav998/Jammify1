import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ named import for v4.x

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Helper to create a fake JWT
  const createFakeJWT = (payload) => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const body = btoa(JSON.stringify(payload));
    const signature = "fake-signature"; // not real cryptography
    return `${header}.${body}.${signature}`;
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

  const login = (username, password, role) => {
    const payload = {
      username,
      role,
      exp: Math.floor(Date.now() / 1000) + 3600, // 1h expiry
    };
    const token = createFakeJWT(payload);
    localStorage.setItem("token", token);
    setUser(payload);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
