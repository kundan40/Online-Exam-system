import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('examToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('examUser');
      localStorage.removeItem('examToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

// Exam services
export const examService = {
  getExams: () => api.get('/exams'),
  getExamById: (id) => api.get(`/exams/${id}`),
  createExam: (examData) => api.post('/exams', examData),
  updateExam: (id, examData) => api.put(`/exams/${id}`, examData),
  deleteExam: (id) => api.delete(`/exams/${id}`),
  startExam: (examId) => api.post(`/exams/${examId}/start`),
  submitExam: (examId, answers) => api.post(`/exams/${examId}/submit`, { answers }),
};

// Question services
export const questionService = {
  addQuestion: (examId, questionData) => api.post(`/exams/${examId}/questions`, questionData),
  getQuestions: (examId) => api.get(`/exams/${examId}/questions`),
  updateQuestion: (questionId, questionData) => api.put(`/questions/${questionId}`, questionData),
  deleteQuestion: (questionId) => api.delete(`/questions/${questionId}`),
};

// Result services
export const resultService = {
  getResults: () => api.get('/results'),
  getResultById: (id) => api.get(`/results/${id}`),
  getStudentResults: (studentId) => api.get(`/students/${studentId}/results`),
  getExamResults: (examId) => api.get(`/exams/${examId}/results`),
};

// User services (admin only)
export const userService = {
  getUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  createUser: (userData) => api.post('/users', userData),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

export default api;