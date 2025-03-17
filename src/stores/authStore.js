import { defineStore } from 'pinia'
import { authApi } from '@/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    roles: [],
    token: localStorage.getItem('token') || null, // Load token directly in initial state
    isLoading: false,
    error: null,
    initialized: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    userData: (state) => state.user,
    userRoles: (state) => state.roles,
    hasRole: (state) => (role) => state.roles.includes(role),
    hasAnyRole: (state) => (roles) => state.roles.some((role) => roles.includes(role)),
    isAdmin: (state) => state.roles.includes('admin'),
    isCoach: (state) => state.roles.includes('coach'),
  },

  actions: {
    async initialize() {
      console.log('Initializing auth store...')
      this.isLoading = true

      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token')
        console.log('Token from localStorage:', token ? 'exists' : 'not found')

        if (!token) {
          console.log('No token found, skipping initialization')
          this.initialized = true
          this.isLoading = false
          return false
        }

        // Set token in store
        this.token = token

        // Load user and roles from localStorage
        const user = JSON.parse(localStorage.getItem('user'))
        const roles = JSON.parse(localStorage.getItem('roles'))

        if (user && roles) {
          this.user = user
          this.roles = roles
          console.log('User and roles loaded from localStorage:', { user, roles })
        } else {
          // If user data is missing, fetch it from the API
          console.log('User data missing in localStorage, fetching from API...')
          await this.fetchUserProfile()
        }

        this.initialized = true
        this.isLoading = false
        return true
      } catch (error) {
        console.error('Auth initialization failed:', error)
        this.logout()
        this.initialized = true
        this.isLoading = false
        return false
      }
    },

    async login(credentials) {
      this.isLoading = true
      this.error = null

      try {
        console.log('Attempting login...')
        const response = await authApi.login(credentials)
        console.log('Login successful, response:', response.data)

        const { token, user, roles } = response.data

        // Save token to localStorage directly here for testing
        localStorage.setItem('token', token)
        console.log('Token saved to localStorage:', token)

        this.setAuthData(user, roles, token)

        // Verify token was saved
        const storedToken = localStorage.getItem('token')
        console.log('Verifying token in localStorage:', storedToken ? 'exists' : 'not found')

        return true
      } catch (error) {
        console.error('Login failed:', error)
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
      if (!this.token) {
        console.warn('Cannot fetch user profile: No token available')
        return null
      }

      try {
        console.log('Fetching user profile from API...')
        const response = await authApi.getUser()
        console.log('User profile response:', response.data)

        // Make sure we got valid data
        if (!response.data || !response.data.user) {
          console.error('Invalid user data received from API')
          throw new Error('Invalid user data')
        }

        this.user = response.data.user
        this.roles = response.data.roles || []
        return this.user
      } catch (error) {
        console.error('Failed to fetch user profile:', error)
        if (error.response?.status === 401) {
          console.log('Unauthorized - logging out')
          this.logout()
        }
        throw error
      }
    },

    logout() {
      console.log('Logging out...')

      // If we have a token, try to invalidate it on the server
      if (this.token) {
        authApi.logout().catch((err) => {
          console.error('Logout API call failed:', err)
          // Silent catch - we're logging out regardless
        })
      }

      // Clear auth data
      this.user = null
      this.roles = []
      this.token = null

      // Remove from localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user') // Hapus user
      localStorage.removeItem('roles') // Hapus roles
      console.log('Logout complete - auth data cleared')
    },

    setAuthData(user, roles, token) {
      console.log('Setting auth data:', {
        user: user ? 'present' : 'missing',
        roles: roles ? roles.length : 'missing',
        token: token ? 'present' : 'missing',
      })

      if (!user || !token) {
        console.error('Invalid auth data - missing user or token')
        return
      }

      this.user = user
      this.roles = Array.isArray(roles) ? roles : []
      this.token = token

      // Store token, user, and roles in localStorage for persistence
      try {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user)) // Simpan user
        localStorage.setItem('roles', JSON.stringify(roles)) // Simpan roles
        console.log('Auth data saved to localStorage')
      } catch (error) {
        console.error('Failed to save auth data to localStorage:', error)
      }
    },
  },
})
