import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/commom/Navbar';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;