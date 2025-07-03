
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: 'restaurant' | 'foodie';
}

interface AuthContextType {
  user: User | null;
  userRole: 'restaurant' | 'foodie' | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: 'restaurant' | 'foodie', fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize with a default restaurant user for testing
    console.log('AuthProvider initializing...');
    const defaultUser: User = {
      id: '1',
      email: 'test@restaurant.com',
      role: 'restaurant'
    };
    setUser(defaultUser);
    setIsLoading(false);
    console.log('AuthProvider initialized with user:', defaultUser);
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('Signing in...');
    const user: User = {
      id: Date.now().toString(),
      email,
      role: 'restaurant' // Default to restaurant for now
    };
    setUser(user);
  };

  const signUp = async (email: string, password: string, role: 'restaurant' | 'foodie', fullName: string) => {
    console.log('Signing up with role:', role, 'and name:', fullName);
    const user: User = {
      id: Date.now().toString(),
      email,
      role
    };
    setUser(user);
  };

  const signOut = async () => {
    console.log('Signing out...');
    setUser(null);
  };

  const value = {
    user,
    userRole: user?.role || null,
    signIn,
    signUp,
    signOut,
    isLoading,
    loading: isLoading // Alias for compatibility
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
