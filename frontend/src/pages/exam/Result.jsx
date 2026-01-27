import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, XCircle, Award, BarChart3, Target, Clock } from 'lucide-react';

const Result = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock result data
    const mockResult = {
      exam: {
        id: 1,
        title: 'Mathematics Final Exam',
        totalMarks: 100,
        passingMarks: 40,
        totalQuestions: 10,
      },
      score: 75,
      percentage: 75,
      status: 'passed',
      timeTaken: '45:30',
      submittedAt: '2024-01-20T14:30:00',
      answers: [
        {
          question: 'What is the value of π (pi) to two decimal places?',
          userAnswer: '3.14',
          correctAnswer: '3.14',
          isCorrect: true,
          marks: 2,
          userMarks: 2,
        },
        {
          question: 'What is the derivative of x²?',
          userAnswer: '2x',
          correctAnswer: '2x',
          isCorrect: true,
          marks: 3,
          userMarks: 3,
        },
        {
          question: 'Solve for x: 2x + 5 = 15',
          userAnswer: '10',
          correctAnswer: '5',
          isCorrect: false,
          marks: 2,
          userMarks: 0,
        },
        {
          question: 'What is the area of a circle with radius 5?',
          userAnswer: '50π',
          correctAnswer: '25π',
          isCorrect: false,
          marks: 3,
          userMarks: 0,
        },
      ],
    };

    setTimeout(() => {
      setResult(mockResult);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const correctAnswers = result.answers.filter(a => a.isCorrect).length;
  const wrongAnswers = result.answers.length - correctAnswers;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Result</h1>
        <p className="text-gray-600">{result.exam.title}</p>
      </div>

      {/* Result Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="flex items-center justify-center h-12 w-12 bg-green-100 rounded-lg mx-auto mb-4">
            <Award className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {result.score}/{result.exam.totalMarks}
          </div>
          <p className="text-gray-600">Total Score</p>
        </div>

        <div className="card text-center">
          <div className="flex items-center justify-center h-12 w-12 bg-blue-100 rounded-lg mx-auto mb-4">
            <BarChart3 className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {result.percentage}%
          </div>
          <p className="text-gray-600">Percentage</p>
        </div>

        <div className="card text-center">
          <div className="flex items-center justify-center h-12 w-12 bg-green-100 rounded-lg mx-auto mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {correctAnswers}
          </div>
          <p className="text-gray-600">Correct Answers</p>
        </div>

        <div className="card text-center">
          <div className="flex items-center justify-center h-12 w-12 bg-red-100 rounded-lg mx-auto mb-4">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {wrongAnswers}
          </div>
          <p className="text-gray-600">Wrong Answers</p>
        </div>
      </div>

      {/* Status Card */}
      <div className={`card mb-8 ${
        result.status === 'passed' 
          ? 'border-green-200 bg-green-50' 
          : 'border-red-200 bg-red-50'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${
              result.status === 'passed' ? 'text-green-800' : 'text-red-800'
            }`}>
              {result.status === 'passed' ? 'Congratulations! 🎉' : 'Better Luck Next Time!'}
            </h3>
            <p className={`${
              result.status === 'passed' ? 'text-green-600' : 'text-red-600'
            }`}>
              {result.status === 'passed' 
                ? `You passed the exam with ${result.percentage}%`
                : `You scored ${result.percentage}% (Passing: ${result.exam.passingMarks}%)`}
            </p>
          </div>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>Time: {result.timeTaken}</span>
            </div>
            <div className="flex items-center">
              <Target className="h-4 w-4 mr-2" />
              <span>Status: <span className="capitalize">{result.status}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Detailed Analysis</h3>
        
        <div className="space-y-6">
          {result.answers.map((answer, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="font-medium text-gray-900 mr-2">
                      Q{index + 1}. {answer.question}
                    </span>
                    {answer.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-3 rounded ${
                      answer.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="text-sm text-gray-600 mb-1">Your Answer</div>
                      <div className={answer.isCorrect ? 'text-green-800 font-medium' : 'text-red-800 font-medium'}>
                        {answer.userAnswer}
                      </div>
                    </div>
                    
                    <div className="p-3 rounded bg-blue-50 border border-blue-200">
                      <div className="text-sm text-gray-600 mb-1">Correct Answer</div>
                      <div className="text-blue-800 font-medium">{answer.correctAnswer}</div>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4 text-right">
                  <div className={`text-lg font-bold ${
                    answer.isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {answer.userMarks}/{answer.marks}
                  </div>
                  <div className="text-sm text-gray-500">Marks</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t flex justify-between">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Performance Summary</h4>
            <p className="text-gray-600">
              You answered {correctAnswers} out of {result.answers.length} questions correctly.
            </p>
          </div>
          <div className="space-x-4">
            <button className="btn-secondary">Review Exam</button>
            <button className="btn-primary">Back to Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;