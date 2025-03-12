<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 hover:scale-105">
      <h2 class="text-3xl font-bold text-center text-primary mb-6">Sign In</h2>
      <form @submit.prevent="handleSignIn" class="space-y-6">
        <FormInput
          label="Email"
          type="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
        <FormInput
          label="Password"
          type="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormInput from '@/components/FormInput.vue'; // Reusable form input component

const email = ref('');
const password = ref('');
const router = useRouter();

const handleSignIn = () => {
  console.log('Signing in with:', email.value, password.value);
  router.push('/');
};
</script>
