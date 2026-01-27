import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Calendar, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const AttemptedExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockExams = [
      {
        id: 1,
        title: 'Mathematics Final Exam',
        score: 85,
        totalMarks: 100,
        percentage: 85,
        status: 'passed',
        attemptedAt: '2024-01-20T14:30:00',
        duration: 120,
        timeTaken: '98:30',
      },
      {
        id: 2,
        title: 'Physics Midterm',
        score: 65,
        totalMarks: 75,
        percentage: 87,
        status: 'passed',
        attemptedAt: '2024-01-18T10:15:00',
        duration: 90,
        timeTaken: '75:45',
      },
      {
        id: 3,
        title: 'Chemistry Quiz',
        score: 32,
        totalMarks: 50,
        percentage: 64,
        status: 'failed',
        attemptedAt: '2024-01-15T16:20:00',
        duration: 45,
        timeTaken: '40:15',
      },
    ];

    setTimeout(() => {
      setExams(mockExams);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    return status === 'passed' 
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attempted Exams</h1>
        <p className="text-gray-600">View your exam history and results</p>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-header">Exam</th>
              <th className="table-header">Score</th>
              <th className="table-header">Percentage</th>
              <th className="table-header">Status</th>
              <th className="table-header">Time Taken</th>
              <th className="table-header">Attempted On</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exams.map((exam) => (
              <tr key={exam.id} className="hover:bg-gray-50">
                <td className="table-cell">
                  <div>
                    <div className="font-medium text-gray-900">{exam.title}</div>
                    <div className="text-sm text-gray-500">
                      Duration: {exam.duration} mins
                    </div>
                  </div>
                </td>
                <td className="table-cell">
                  <div className="text-lg font-semibold">
                    {exam.score}/{exam.totalMarks}
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          exam.percentage >= 70
                            ? 'bg-green-500'
                            : exam.percentage >= 40
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${exam.percentage}%` }}
                      />
                    </div>
                    <span className="ml-3 font-medium">{exam.percentage}%</span>
                  </div>
                </td>
                <td className="table-cell">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                    {exam.status === 'passed' ? (
                      <CheckCircle className="inline h-3 w-3 mr-1" />
                    ) : (
                      <XCircle className="inline h-3 w-3 mr-1" />
                    )}
                    {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                  </span>
                </td>
                <td className="table-cell">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {exam.timeTaken}
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(exam.attemptedAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="table-cell">
                  <Link
                    to={`/exams/${exam.id}/result`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-900"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Result
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttemptedExams;