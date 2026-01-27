import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('examUser');
    const storedToken = localStorage.getItem('examToken');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulated API call - replace with actual API
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // Mock user data based on email
          let mockUser;
          if (email.includes('admin')) {
            mockUser = {
              id: 1,
              email,
              name: 'Admin User',
              role: 'admin',
            };
          } else if (email.includes('teacher')) {
            mockUser = {
              id: 2,
              email,
              name: 'Teacher User',
              role: 'teacher',
            };
          } else {
            mockUser = {
              id: 3,
              email,
              name: 'Student User',
              role: 'student',
            };
          }
          resolve({
            data: {
              user: mockUser,
              token: 'mock-jwt-token',
            },
          });
        }, 1000);
      });

      const { user: userData, token } = response.data;
      localStorage.setItem('examUser', JSON.stringify(userData));
      localStorage.setItem('examToken', token);
      setUser(userData);
      toast.success('Login successful!');
      return { success: true, user: userData };
    } catch (error) {
      toast.error('Invalid credentials');
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const register = async (userData) => {
    try {
      // Simulated API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              user: {
                ...userData,
                id: Date.now(),
                role: 'student',
              },
              token: 'mock-jwt-token',
            },
          });
        }, 1000);
      });

      const { user: newUser, token } = response.data;
      localStorage.setItem('examUser', JSON.stringify(newUser));
      localStorage.setItem('examToken', token);
      setUser(newUser);
      toast.success('Registration successful!');
      return { success: true, user: newUser };
    } catch (error) {
      toast.error('Registration failed');
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('examUser');
    localStorage.removeItem('examToken');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};