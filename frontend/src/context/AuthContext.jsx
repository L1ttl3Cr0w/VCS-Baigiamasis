import { createContext, useState } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  const value = {
    isLoggedIn,
    user,
    login: (token, userData) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoggedIn(true);
      setUser(userData);
      toast.success(`Welcome back, ${userData.name}!`);
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setUser(null);
      toast.warning('Logout successful!');
    },
    register: () => {
      toast.success('Registration successful! Please login.');
      return true;
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
