import { create } from 'zustand';
import { auth } from '../services/api';
import { connectSocket, disconnectSocket } from '../services/socket';

interface User {
  id: string;
  name: string;
  email: string;
  language: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, language: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email, password) => {
    try {
      const { token, user } = await auth.login(email, password);
      localStorage.setItem('token', token);
      set({ user, isAuthenticated: true });
      // Only pass serializable data
      connectSocket(user.id.toString(), 'general');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  register: async (name, email, password, language) => {
    try {
      const { token, user } = await auth.register(name, email, password, language);
      localStorage.setItem('token', token);
      set({ user, isAuthenticated: true });
      // Only pass serializable data
      connectSocket(user.id.toString(), 'general');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    disconnectSocket();
    set({ user: null, isAuthenticated: false });
  },
  loadUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const user = await auth.getProfile();
      set({ user, isAuthenticated: true });
      // Only pass serializable data
      connectSocket(user.id.toString(), 'general');
    } catch (error) {
      console.error('Loading user failed:', error);
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false });
    }
  },
}));