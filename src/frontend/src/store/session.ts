import { defineStore } from 'pinia';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface SessionState {
  token: string | null;
  role: string | null;
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    token: null,
    role: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    isShelter: (state) => state.role === 'SHELTER',
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post('http://localhost:5000/auth/login', { email, password });
        this.token = response.data.token;
        if (this.token) {
          const decoded: any = jwtDecode(this.token);
          this.role = decoded.role; // Assuming the role is stored in the token's payload
          localStorage.setItem('token', this.token);
          if(this.role)
            localStorage.setItem('role', this.role);
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        }
      } catch (error) {
        console.error('Login error:', error);
        throw new Error('Failed to login');
      }
    },
    logout() {
      this.token = null;
      this.role = null;
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
    initialize() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        const decoded: any = jwtDecode(token);
        this.role = decoded.role; // Assuming the role is stored in the token's payload
      }
    },
  },
});
