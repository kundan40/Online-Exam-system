import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';

const Attempt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock exam data
    const mockExam = {
      id: 1,
      title: 'Mathematics Final Exam',
      duration: 60,
      totalMarks: 100,
    };

    const mockQuestions = [
      {
        id: 1,
        text: 'What is the value of π (pi) to two decimal places?',
        options: ['3.14', '3.15', '3.16', '3.17'],
        marks: 2,
      },
      {
        id: 2,
        text: 'What is the derivative of x²?',
        options: ['2x', 'x', '2', 'x²'],
        marks: 3,
      },
      {
        id: 3,
        text: 'Solve for x: 2x + 5 = 15',
        options: ['5', '10', '7.5', '8'],
        marks: 2,
      },
      {
        id: 4,
        text: 'What is the area of a circle with radius 5?',
        options: ['25π', '50π', '100π', '5π'],
        marks: 3,
      },
    ];

    setTimeout(() => {
      setExam(mockExam);
      setQuestions(mockQuestions);
      setLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = useCallback(async () => {
    // Submit exam logic
    console.log('Submitting exam with answers:', answers);
    
    // Calculate score (mock calculation)
    const score = Object.entries(answers).reduce((total, [qIndex, answer]) => {
      // Mock correct answers
      const correctAnswers = { 0: 0, 1: 0, 2: 0, 3: 0 };
      return total + (answer === correctAnswers[qIndex] ? questions[qIndex].marks : 0);
    }, 0);

    alert(`Exam submitted! Your score: ${score}/${exam.totalMarks}`);
    navigate(`/exams/${id}/result`);
  }, [answers, exam, id, navigate, questions]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{exam.title}</h1>
            <p className="text-gray-600">Answer all questions carefully</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center bg-red-50 text-red-700 px-4 py-2 rounded-lg">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to submit the exam?')) {
                  handleSubmit();
                }
              }}
              className="btn-primary"
            >
              Submit Exam
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Navigation */}
        <div className="flex flex-wrap gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
                currentQuestion === index
                  ? 'bg-primary-600 text-white'
                  : answers[index] !== undefined
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question Card */}
      <div className="card shadow-lg">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Question {currentQuestion + 1}
            </h2>
            <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
              {questions[currentQuestion]?.marks} marks
            </span>
          </div>
          
          <p className="text-gray-800 text-lg mb-8">
            {questions[currentQuestion]?.text}
          </p>

          {/* Options */}
          <div className="space-y-4">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  answers[currentQuestion] === index
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                    answers[currentQuestion] === index
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : 'border-gray-300'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-gray-800">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Previous</span>
          </button>
          
          <div className="text-center">
            <div className="flex items-center text-amber-600 text-sm">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>Auto-saves every 30 seconds</span>
            </div>
          </div>

          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="btn-primary flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to submit? You cannot change answers after submission.')) {
                  handleSubmit();
                }
              }}
              className="btn-primary bg-green-600 hover:bg-green-700"
            >
              Submit Final Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attempt;