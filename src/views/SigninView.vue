<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary"
  >
    <div
      class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 hover:scale-105"
    >
      <h2 class="text-3xl font-bold text-center text-primary mb-6">Sign In</h2>
      <form @submit.prevent="handleSignIn" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors duration-200"
        >
          Sign In
        </button>
      </form>
      <p class="mt-6 text-center text-gray-600">
        Don't have an account?
        <router-link to="/signup" class="text-secondary hover:underline">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleSignIn = () => {
  // Simulate sign-in logic
  console.log('Signing in with:', email.value, password.value)
  router.push('/') // Redirect to home after sign-in
}
</script>
