import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },
  register: async (name: string, email: string, password: string, language: string) => {
    const { data } = await api.post('/auth/register', { name, email, password, language });
    return data;
  },
  getProfile: async () => {
    const { data } = await api.get('/auth/profile');
    return data;
  },
};

export const chat = {
  getMessages: async (room: string) => {
    const { data } = await api.get(`/chat/messages/${room}`);
    return data;
  },
  sendMessage: async (content: string, room: string, originalLanguage: string) => {
    const { data } = await api.post('/chat/messages', { content, room, originalLanguage });
    return data;
  },
};

export const documents = {
  getAll: async () => {
    const { data } = await api.get('/documents');
    return data;
  },
  create: async (title: string, content: string) => {
    const { data } = await api.post('/documents', { title, content });
    return data;
  },
  update: async (id: string, title: string, content: string) => {
    const { data } = await api.put(`/documents/${id}`, { title, content });
    return data;
  },
};

export default api;