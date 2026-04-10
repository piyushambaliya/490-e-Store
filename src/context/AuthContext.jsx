import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import API_BASE_URL from '../api.config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [adminAccess, setAdminAccess] = useState(false);

  const login = useCallback(async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        setAdminAccess(data.isAdmin);
        localStorage.setItem('userInfo', JSON.stringify(data));
        return { success: true, message: data.isAdmin ? 'Admin Panel Access Granted' : 'Logged in successfully', isAdmin: data.isAdmin };
      } else {
        return { success: false, message: data.message || 'Invalid email or password', isAdmin: false };
      }
    } catch (err) {
      return { success: false, message: 'Network error during login', isAdmin: false };
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        return { success: true, message: data.message || 'Account created successfully. Please login.' };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (err) {
      return { success: false, message: 'Network error during signup' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setAdminAccess(false);
    localStorage.removeItem('userInfo');
  }, []);

  // Persist login state
  React.useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      setUser(parsed);
      setAdminAccess(parsed.isAdmin);
    }
  }, []);

  const value = useMemo(
    () => ({ user, adminAccess, login, logout, register }),
    [user, adminAccess, login, logout, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
