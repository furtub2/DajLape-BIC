import { defineStore } from 'pinia';
import axios from 'axios';

interface SessionState {
  token: string | null;
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    token: null,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post('http://localhost:5000/auth/login', { email, password });
        this.token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        console.log(response)
        if(this.token) localStorage.setItem('token', this.token);
      } catch (error) {
        console.error('Login error:', error);
        throw new Error('Failed to login');
      }
    },
    logout() {
      this.token = null;
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    },
    initialize() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      }
    },
  },
});
