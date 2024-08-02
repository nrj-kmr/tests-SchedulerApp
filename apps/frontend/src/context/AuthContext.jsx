import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const sessionData = JSON.parse(sessionStorage.getItem('user')) || {};
  const userEmail = sessionData.email || '';
  const isUserAdmin = sessionData.isAdmin || '';

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