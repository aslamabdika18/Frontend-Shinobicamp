// src/api/index.js
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore' // Pinia store untuk autentikasi

// Buat instance Axios
const createApiClient = () => {
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Ambil dari environment variable
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Untuk mengirim cookie (required oleh Sanctum)
  })

  // Tambahkan interceptor untuk request
  apiClient.interceptors.request.use(
    (config) => {
      const authStore = useAuthStore()
      if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  // Tambahkan interceptor untuk response
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized error (misalnya, redirect ke login)
        const authStore = useAuthStore()
        authStore.logout()
        window.location.href = '/login'
      }
      return Promise.reject(error)
    },
  )

  return apiClient
}

// Ekspor instance Axios
export const apiClient = createApiClient()
