import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Edit, Trash2, Eye } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active', createdAt: '2024-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'teacher', status: 'active', createdAt: '2024-01-10' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'admin', status: 'active', createdAt: '2024-01-05' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'student', status: 'inactive', createdAt: '2024-01-20' },
    ];
    
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'teacher': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage all system users</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <UserPlus className="h-5 w-5" />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <select className="input-field">
                <option value="">All Roles</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
              <select className="input-field">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">ID</th>
                <th className="table-header">Name</th>
                <th className="table-header">Email</th>
                <th className="table-header">Role</th>
                <th className="table-header">Status</th>
                <th className="table-header">Created</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="table-cell">#{user.id}</td>
                  <td className="table-cell">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">{user.email}</td>
                  <td className="table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="table-cell">{user.createdAt}</td>
                  <td className="table-cell">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-1 text-green-600 hover:text-green-800">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">{filteredUsers.length}</span> of{' '}
            <span className="font-medium">{users.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="btn-secondary">Previous</button>
            <button className="btn-primary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;