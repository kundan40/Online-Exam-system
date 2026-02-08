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
    const res = await fetch(
      "http://localhost/Online-Exam-system/backend/api/auth/login.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();

    if (!res.ok || data.error) {
      toast.error(data.message || "Invalid credentials");
      return { success: false };
    }

    // ✅ Save user (you don't have JWT yet, so no token)
    localStorage.setItem("examUser", JSON.stringify(data.user));
    setUser(data.user);

    toast.success("Login successful!");
    return { success: true, user: data.user };

  } catch (error) {
    console.error("Login error:", error);
    toast.error("Server error");
    return { success: false };
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