
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  username: string;
  token: string;
}

interface AuthContextProps {
  children: ReactNode;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [localUser, setLocalUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await axios.post('/login', { username, password });
      const user = response.data;
      setLocalUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logoutUser = () => {
    setLocalUser(null);
    localStorage.removeItem('user');
  };

  const registerUser = async (name: string, username: string, password: string) => {
    try {
      const response = await axios.post('/register', { name, username, password });
      const user = response.data;
      setLocalUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const contextValue: AuthContextProps = {
    children,
    user: localUser,
    login: loginUser,
    logout: logoutUser,
    register: registerUser,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
