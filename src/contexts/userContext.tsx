import { createContext, useContext, useState, ReactNode } from "react";
import { City, UserType } from "../types/userType";

type User = {
  id: string,
    firstName: string,
    lastName: string,
    userType:  UserType,
    phoneNumber: string,
    address: string,
    city: City,
    email: string,
    createdAt: Date,
    approvedAt: Date,
    approvedBy: string,
    isApproved: boolean,
} | null;

interface UserContextType {
  user: User;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the auth context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
};