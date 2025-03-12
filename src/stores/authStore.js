import { defineStore } from 'pinia'
import { apiClient } from '@/api'
import { handleError } from '@/utils/errorHandler'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    role: null, // Tambahkan role
  }),

  actions: {
    // Inisialisasi auth saat aplikasi dimuat
    initializeAuth() {
      const token = localStorage.getItem('authToken')
      if (token) {
        this.token = token
        this.isAuthenticated = true
        this.fetchUser() // Ambil data user jika token ada
      }
    },

    // Login pengguna
    async login(credentials) {
      try {
        const response = await apiClient.post('/login', credentials)
        this.setAuthData(response.data)
        return true // Berhasil login
      } catch (error) {
        handleError(error, 'Login failed. Please check your credentials.')
        return false // Gagal login
      }
    },

    // Set data autentikasi (termasuk role)
    setAuthData(data) {
      this.user = data.user
      this.token = data.token
      this.isAuthenticated = true
      this.role = data.user.role // Simpan role
      localStorage.setItem('authToken', data.token)
    },

    // Hapus data autentikasi (termasuk role)
    clearAuthData() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      this.role = null // Hapus role
      localStorage.removeItem('authToken')
    },

    // Ambil data pengguna yang sedang login
    async fetchUser() {
      try {
        const response = await apiClient.get('/user')
        this.user = response.data
        this.isAuthenticated = true
        this.role = response.data.role // Perbarui role
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.clearAuthData() // Hapus data auth jika gagal
      }
    },
  },
})
