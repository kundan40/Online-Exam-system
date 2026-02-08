import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/commom/ProtectedRoute';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Dashboard
import Dashboard from '../pages/Dashboard';

// Admin Pages
import Users from '../pages/admin/User';

// Teacher Pages
import CreateExam from '../pages/teacher/CreateExam';

// Student Pages
import Exams from '../pages/student/Exams';

// Exam Pages
import Attempt from '../pages/exam/Attempt';
import Result from '../pages/exam/Result';


// teachcer registration page
import TeacherRegister from '../pages/auth/Teacher/RegistrationPage';



// Admin registration page
import AdminRegister from '../pages/auth/Admin/RegistrationPage';
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teacher/register" element={<TeacherRegister />} />
        <Route path="/admin/register" element={<AdminRegister />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<DashboardLayout />}>
        {/* Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/users" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Users />
          </ProtectedRoute>
        } />

        {/* Teacher Routes */}
        <Route path="/exams/create" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <CreateExam />
          </ProtectedRoute>
        } />

        {/* Student Routes */}
        <Route path="/exams" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Exams />
          </ProtectedRoute>
        } />

        {/* Exam Routes */}
        <Route path="/exams/:id/attempt" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Attempt />
          </ProtectedRoute>
        } />
        
        <Route path="/exams/:id/result" element={
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        } />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;