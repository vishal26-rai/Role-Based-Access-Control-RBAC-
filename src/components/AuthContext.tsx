
import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  name: string;
  email: string;
  role: "admin" | "user";
};

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: User[] = [
  { name: "Alice", email: "admin@site.com", role: "admin" },
  { name: "Bob", email: "user@site.com", role: "user" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const data = localStorage.getItem("demo_user");
    return data ? JSON.parse(data) : null;
  });

  // Fake login/signup for demo. In real app, call backend API.
  const login = async (email: string, password: string) => {
    const match = DEMO_USERS.find((u) => u.email === email);
    if (match && password === "password") {
      setUser(match);
      localStorage.setItem("demo_user", JSON.stringify(match));
      return { success: true, message: "Login successful!" };
    }
    return { success: false, message: "Incorrect email or password." };
  };

  const signup = async (name: string, email: string, password: string) => {
    // Accept any email - set as regular user
    const fakeNew: User = { name, email, role: "user" };
    setUser(fakeNew);
    localStorage.setItem("demo_user", JSON.stringify(fakeNew));
    return { success: true, message: "Signup successful!" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("demo_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used in AuthProvider");
  return ctx;
}
