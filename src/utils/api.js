import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  getSupervisors: () => api.get('/users/supervisors'),
  changePassword: (data) => api.put('/users/change-password', data),
};

export const projectAPI = {
  create: (data) => api.post('/projects', data),
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  approveProposal: (id, decision, feedback) =>
    api.patch(`/projects/${id}/proposal-decision`, { decision, feedback }),
  uploadSRS: (id, file) => {
    const formData = new FormData();
    formData.append('srs', file);
    return api.post(`/projects/${id}/srs`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const logAPI = {
  create: (data) => api.post('/logs', data),
  getByProject: (projectId) => api.get(`/logs/project/${projectId}`),
  sign: (logId) => api.patch(`/logs/${logId}/sign`),
  requestInfo: (logId, feedback) => api.patch(`/logs/${logId}/request-info`, { feedback }),
};

export const defenseAPI = {
  getAll: () => api.get('/defenses'),
  getById: (id) => api.get(`/defenses/${id}`),
  submitEvaluation: (id, data) => api.patch(`/defenses/${id}/evaluate`, data),
  approveGrades: (ids) => api.post('/defenses/approve-grades', { defenseIds: ids }),
};

export const notificationAPI = {
  getAll: (params) => api.get('/notifications', { params }),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.post('/notifications/mark-all-read'),
};

export default api;
