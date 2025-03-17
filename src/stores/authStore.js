import { defineStore } from 'pinia'
import { authApi } from '@/api' // Import your updated API client

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    roles: [],
    token: null,
    isLoading: false,
    error: null,
    initialized: false, // Track initialization status
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    userData: (state) => state.user,
    userRoles: (state) => state.roles,

    // Check if user has a specific role
    hasRole: (state) => (role) => {
      return state.roles.includes(role)
    },

    // Check if user has any of the specified roles
    hasAnyRole: (state) => (roles) => {
      return state.roles.some((role) => roles.includes(role))
    },

    // Check if user is an admin
    isAdmin: (state) => {
      return state.roles.includes('admin')
    },

    // Check if user is a coach
    isCoach: (state) => {
      return state.roles.includes('coach')
    },
  },

  actions: {
    async initialize() {
      // Check if token exists in localStorage
      const token = localStorage.getItem('token')

      if (token) {
        this.token = token

        try {
          // Fetch user profile with the token
          await this.fetchUserProfile()
          this.initialized = true
          return true
        } catch (error) {
          console.error('Failed to initialize authentication:', error)
          this.logout()
          this.initialized = true
          return false
        }
      }

      this.initialized = true
      return false
    },

    async login(credentials) {
      this.isLoading = true
      this.error = null

      try {
        const response = await authApi.login(credentials)
        const { token, user, roles } = response.data

        this.setAuthData(user, roles, token)
        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Authentication failed'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async register(userData) {
      this.isLoading = true
      this.error = null

      try {
        const response = await authApi.register(userData)
        const { token, user, roles } = response.data

        this.setAuthData(user, roles, token)
        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Registration failed'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async fetchUserProfile() {
      if (!this.token) return null

      try {
        const response = await authApi.getUser()
        this.user = response.data.user
        this.roles = response.data.roles || []
        return this.user
      } catch (error) {
        if (error.response?.status === 401) {
          this.logout()
        }
        throw error
      }
    },

    logout() {
      // If we have a token, try to invalidate it on the server
      if (this.token) {
        authApi.logout().catch(() => {
          // Silent catch - we're logging out regardless
        })
      }

      // Clear auth data
      this.user = null
      this.roles = []
      this.token = null

      // Remove from localStorage
      localStorage.removeItem('token')
    },

    setAuthData(user, roles, token) {
      this.user = user
      this.roles = Array.isArray(roles) ? roles : []
      this.token = token

      // Store token in localStorage for persistence
      localStorage.setItem('token', token)
    },
  },
})
