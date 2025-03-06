import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../types/userType";

interface UserContextType {
  user?: User;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user])

  useEffect(() => {
    const existUser = localStorage.getItem('user');
    if (existUser) {
      setUser(JSON.parse(existUser))
    }
  }, [])


  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(undefined);

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

// Hook to use the auth context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
};
