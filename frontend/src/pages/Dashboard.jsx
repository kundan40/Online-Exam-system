import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Users, BarChart3, Calendar, TrendingUp, Award } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const getDashboardData = () => {
    switch (user.role) {
      case 'admin':
        return {
          title: 'Admin Dashboard',
          stats: [
            { label: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500' },
            { label: 'Active Exams', value: '24', icon: BookOpen, color: 'bg-green-500' },
            { label: 'Exams Today', value: '5', icon: Calendar, color: 'bg-purple-500' },
            { label: 'Pass Rate', value: '78%', icon: TrendingUp, color: 'bg-orange-500' },
          ],
          recentActivities: [
            { title: 'New user registered', time: '2 mins ago', type: 'user' },
            { title: 'Exam created by Teacher', time: '15 mins ago', type: 'exam' },
            { title: 'Student submitted exam', time: '30 mins ago', type: 'submission' },
          ],
        };
      case 'teacher':
        return {
          title: 'Teacher Dashboard',
          stats: [
            { label: 'Created Exams', value: '12', icon: BookOpen, color: 'bg-blue-500' },
            { label: 'Active Students', value: '156', icon: Users, color: 'bg-green-500' },
            { label: 'Average Score', value: '72%', icon: BarChart3, color: 'bg-purple-500' },
            { label: 'To Grade', value: '8', icon: Award, color: 'bg-orange-500' },
          ],
          recentActivities: [
            { title: 'New exam submission', time: '5 mins ago' },
            { title: 'Student query received', time: '25 mins ago' },
            { title: 'Exam published successfully', time: '1 hour ago' },
          ],
        };
      default: // student
        return {
          title: 'Student Dashboard',
          stats: [
            { label: 'Available Exams', value: '5', icon: BookOpen, color: 'bg-blue-500' },
            { label: 'Attempted Exams', value: '3', icon: Calendar, color: 'bg-green-500' },
            { label: 'Average Score', value: '85%', icon: BarChart3, color: 'bg-purple-500' },
            { label: 'Rank', value: '#12', icon: Award, color: 'bg-orange-500' },
          ],
          recentActivities: [
            { title: 'Mathematics exam completed', time: 'Yesterday', score: '92/100' },
            { title: 'Physics exam available', time: '2 days ago' },
            { title: 'Chemistry result published', time: '3 days ago', score: '78/100' },
          ],
        };
    }
  };

  const data = getDashboardData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>
        <p className="text-gray-600">
          Welcome back, {user.name}! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {data.recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-medium">!</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  {activity.score && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      Score: {activity.score}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {user.role === 'student' && (
              <>
                <button className="w-full btn-primary text-left py-3 px-4">
                  Browse Available Exams
                </button>
                <button className="w-full btn-secondary text-left py-3 px-4">
                  View Results
                </button>
                <button className="w-full btn-secondary text-left py-3 px-4">
                  Download Certificate
                </button>
              </>
            )}
            {user.role === 'teacher' && (
              <>
                <button className="w-full btn-primary text-left py-3 px-4">
                  Create New Exam
                </button>
                <button className="w-full btn-secondary text-left py-3 px-4">
                  View Student Submissions
                </button>
                <button className="w-full btn-secondary text-left py-3 px-4">
                  Manage Questions
                </button>
              </>
            )}
            {user.role === 'admin' && (
              <>
                <button className="w-full btn-primary text-left py-3 px-4">
                  Manage Users
                </button>
                <button className="w-full btn-secondary text-left py-3 px-4">
                  View All Exams
                </button>
                <button className="w-full btn-secondary text-left py-3 px-4">
                  System Analytics
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;