import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, BookOpen, CheckCircle, XCircle } from 'lucide-react';

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    const mockExams = [
      {
        id: 1,
        title: 'Mathematics Final Exam',
        description: 'Covers all topics from semester 1',
        duration: 120,
        totalMarks: 100,
        passingMarks: 40,
        startDate: '2024-02-01T09:00:00',
        endDate: '2024-02-10T23:59:00',
        status: 'available',
        attempted: false,
      },
      {
        id: 2,
        title: 'Physics Midterm',
        description: 'Mechanics and Thermodynamics',
        duration: 90,
        totalMarks: 75,
        passingMarks: 30,
        startDate: '2024-01-25T10:00:00',
        endDate: '2024-01-30T23:59:00',
        status: 'ongoing',
        attempted: true,
      },
      {
        id: 3,
        title: 'Chemistry Quiz',
        description: 'Organic Chemistry Basics',
        duration: 45,
        totalMarks: 50,
        passingMarks: 20,
        startDate: '2024-01-20T14:00:00',
        endDate: '2024-01-22T23:59:00',
        status: 'ended',
        attempted: true,
      },
    ];

    setTimeout(() => {
      setExams(mockExams);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'ended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isExamAvailable = (exam) => {
    const now = new Date();
    const start = new Date(exam.startDate);
    const end = new Date(exam.endDate);
    return now >= start && now <= end && !exam.attempted;
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
        <h1 className="text-2xl font-bold text-gray-900">Available Exams</h1>
        <p className="text-gray-600">Browse and attempt available examinations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {exam.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{exam.description}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                {exam.status}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">{exam.duration} minutes</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">
                  {new Date(exam.startDate).toLocaleDateString()} -{' '}
                  {new Date(exam.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Total Marks: <span className="font-semibold">{exam.totalMarks}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Passing: <span className="font-semibold">{exam.passingMarks}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center">
                {exam.attempted ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400 mr-2" />
                )}
                <span className="text-sm text-gray-600">
                  {exam.attempted ? 'Attempted' : 'Not Attempted'}
                </span>
              </div>
              
              <div className="space-x-2">
                <Link
                  to={`/exams/${exam.id}/view`}
                  className="btn-secondary text-sm py-2 px-3"
                >
                  View Details
                </Link>
                {isExamAvailable(exam) && (
                  <Link
                    to={`/exams/${exam.id}/attempt`}
                    className="btn-primary text-sm py-2 px-3"
                  >
                    Start Exam
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {exams.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Exams Available</h3>
          <p className="text-gray-600">There are no exams available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Exams;