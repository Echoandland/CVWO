import React, { createContext, useContext, useState , ReactNode} from 'react';

type AuthContextType = {
  user: any | null;
  login: (user: any) => void;
  logout: () => void;
};
type AuthProviderProps = {
    children: ReactNode;
  };
  

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  const login = (newUser: any) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
