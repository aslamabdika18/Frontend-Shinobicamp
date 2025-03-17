import axios from 'axios'

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

// Add request interceptor to attach token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Handle 401 errors (token expired or invalid)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Import dynamically to avoid circular dependency
      const { useAuthStore } = await import('@/stores/authStore')
      const authStore = useAuthStore()

      // Logout and redirect to login page
      authStore.logout()
      window.location.href = '/signin'
    }

    return Promise.reject(error)
  },
)

export default apiClient

// Auth API endpoints
export const authApi = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/register', userData),
  logout: () => apiClient.post('/auth/logout'),
  getUser: () => apiClient.get('/auth/user'),
}

// Events API endpoints
export const eventApi = {
  getAll: () => apiClient.get('/events'),
  getById: (id) => apiClient.get(`/events/${id}`),
  create: (eventData) => apiClient.post('/events', eventData),
  update: (id, eventData) => apiClient.put(`/events/${id}`, eventData),
  delete: (id) => apiClient.delete(`/events/${id}`),
}

// Teams API endpoints
export const teamApi = {
  getAll: () => apiClient.get('/teams'),
  getById: (id) => apiClient.get(`/teams/${id}`),
  create: (teamData) => apiClient.post('/teams', teamData),
  update: (id, teamData) => apiClient.put(`/teams/${id}`, teamData),
  delete: (id) => apiClient.delete(`/teams/${id}`),
}

// Add other API endpoints as needed...
