import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Users,
  BarChart3,
  FileText,
  Clock,
  Settings,
  User,
  Calendar,
} from 'lucide-react';

const Sidebar = ({ role }) => {
  const location = useLocation();

  const studentLinks = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/exams', icon: BookOpen, label: 'Available Exams' },
    { to: '/attempted-exams', icon: FileText, label: 'Attempted Exams' },
    { to: '/results', icon: BarChart3, label: 'Results' },
  ];

  const teacherLinks = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/exams/create', icon: BookOpen, label: 'Create Exam' },
    { to: '/exams', icon: FileText, label: 'My Exams' },
    { to: '/questions', icon: Calendar, label: 'Manage Questions' },
    { to: '/results', icon: BarChart3, label: 'Student Results' },
  ];

  const adminLinks = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/users', icon: Users, label: 'Manage Users' },
    { to: '/all-exams', icon: BookOpen, label: 'All Exams' },
    { to: '/all-results', icon: BarChart3, label: 'All Results' },
    { to: '/settings', icon: Settings, label: 'System Settings' },
  ];

  const links = role === 'admin' ? adminLinks : 
                role === 'teacher' ? teacherLinks : studentLinks;

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen hidden md:block">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-8">ExamSys</h2>
        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium capitalize">{role}</p>
            <p className="text-sm text-gray-400">Account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;