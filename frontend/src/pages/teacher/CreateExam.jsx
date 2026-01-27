import React, { useState } from 'react';
import { Plus, X, Clock, Calendar } from 'lucide-react';

const CreateExam = () => {
  const [examData, setExamData] = useState({
    title: '',
    description: '',
    duration: 60,
    totalMarks: 100,
    passingMarks: 40,
    startDate: '',
    endDate: '',
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    marks: 1,
  });

  const handleExamChange = (e) => {
    setExamData({
      ...examData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddQuestion = () => {
    if (!newQuestion.text || newQuestion.options.some(opt => !opt)) {
      alert('Please fill all question fields');
      return;
    }

    setExamData({
      ...examData,
      questions: [...examData.questions, { ...newQuestion }],
    });

    setNewQuestion({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      marks: 1,
    });
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = examData.questions.filter((_, i) => i !== index);
    setExamData({ ...examData, questions: updatedQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Exam created:', examData);
    alert('Exam created successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Exam</h1>
        <p className="text-gray-600">Create a new examination with questions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Exam Details */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Exam Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exam Title *
              </label>
              <input
                type="text"
                name="title"
                value={examData.title}
                onChange={handleExamChange}
                className="input-field"
                placeholder="Enter exam title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes) *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="duration"
                  value={examData.duration}
                  onChange={handleExamChange}
                  className="input-field pl-10"
                  min="1"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Marks *
              </label>
              <input
                type="number"
                name="totalMarks"
                value={examData.totalMarks}
                onChange={handleExamChange}
                className="input-field"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passing Marks *
              </label>
              <input
                type="number"
                name="passingMarks"
                value={examData.passingMarks}
                onChange={handleExamChange}
                className="input-field"
                min="0"
                max={examData.totalMarks}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="datetime-local"
                  name="startDate"
                  value={examData.startDate}
                  onChange={handleExamChange}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="datetime-local"
                  name="endDate"
                  value={examData.endDate}
                  onChange={handleExamChange}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={examData.description}
                onChange={handleExamChange}
                className="input-field min-h-[100px]"
                placeholder="Enter exam description"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Add Questions */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Questions</h2>
          
          <div className="space-y-4 mb-6 p-4 border rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Text *
              </label>
              <textarea
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
                className="input-field"
                placeholder="Enter your question"
                rows="2"
              />
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Options *
              </label>
              {newQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="w-6 text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...newQuestion.options];
                      newOptions[index] = e.target.value;
                      setNewQuestion({...newQuestion, options: newOptions});
                    }}
                    className="input-field flex-1"
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  />
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={newQuestion.correctAnswer === index}
                    onChange={() => setNewQuestion({...newQuestion, correctAnswer: index})}
                    className="h-5 w-5 text-primary-600"
                  />
                  <span className="text-sm text-gray-500">Correct</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marks for this question
                </label>
                <input
                  type="number"
                  value={newQuestion.marks}
                  onChange={(e) => setNewQuestion({...newQuestion, marks: parseInt(e.target.value)})}
                  className="input-field w-24"
                  min="1"
                />
              </div>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Question</span>
              </button>
            </div>
          </div>

          {/* Questions List */}
          {examData.questions.length > 0 ? (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">
                Added Questions ({examData.questions.length})
              </h3>
              {examData.questions.map((question, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="font-medium text-gray-900">
                        Q{index + 1}. {question.text}
                      </span>
                      <div className="mt-2 space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`flex items-center space-x-2 ${
                              optIndex === question.correctAnswer
                                ? 'text-green-600 font-medium'
                                : 'text-gray-700'
                            }`}
                          >
                            <span>{String.fromCharCode(65 + optIndex)}.</span>
                            <span>{option}</span>
                            {optIndex === question.correctAnswer && (
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                                Correct
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Marks: {question.marks}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(index)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No questions added yet. Add your first question above.
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" className="btn-secondary">
            Save as Draft
          </button>
          <button type="submit" className="btn-primary">
            Create Exam
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateExam;