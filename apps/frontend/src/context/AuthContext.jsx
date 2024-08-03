import React, { createContext, useState, useEffect } from 'react';
import { fetchUserByEmail } from '../services/apiServices';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const sessionData = JSON.parse(sessionStorage.getItem('user')) || {};
  const userEmail = sessionData.email || '';
  
  if (user) {
    fetchUserByEmail(userEmail).then((response) => {
      setIsUserAdmin(response.data.isAdmin);
    });
  }

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, userEmail, isUserAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};