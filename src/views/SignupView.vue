<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-secondary to-primary">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 hover:scale-105">
      <h2 class="text-3xl font-bold text-center text-primary mb-6">Sign Up</h2>
      <form @submit.prevent="handleSignUp" class="space-y-6">
        <FormInput
          label="Name"
          type="text"
          v-model="name"
          placeholder="Enter your name"
          required
        />
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
          Sign Up
        </button>
      </form>
      <p class="mt-6 text-center text-gray-600">
        Already have an account?
        <router-link to="/signin" class="text-secondary hover:underline">Sign In</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormInput from '@/components/FormInput.vue'; // Reusable form input component

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const handleSignUp = () => {
  console.log('Signing up with:', name.value, email.value, password.value);
  router.push('/signin');
};
</script>
