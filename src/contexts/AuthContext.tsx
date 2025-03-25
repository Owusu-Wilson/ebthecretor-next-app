"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";

// Define the user type
type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor";
} | null;

// Define the authentication context type
type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration (in a real app, this would come from an API)
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@kanik.com",
    password: "admin123", // In a real app, passwords would be hashed
    name: "Admin User",
    role: "admin" as const,
  },
  {
    id: "2",
    email: "editor@kanik.com",
    password: "editor123",
    name: "Editor User",
    role: "editor" as const,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in by retrieving from localStorage
    const storedUser = localStorage.getItem("kanik-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login functionality (replace with real API call in production)
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        // Create user object without password
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);

        // Store user in localStorage for persistence
        localStorage.setItem("kanik-user", JSON.stringify(userWithoutPassword));
        setLoading(false);
        return true;
      }

      setLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kanik-user");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
