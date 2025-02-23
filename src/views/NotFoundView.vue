<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-primary to-secondary"
  >
    <div class="text-center">
      <!-- Animasi atau Gambar -->
      <div class="mb-8 animate-bounce">
        <svg
          class="w-24 h-24 mx-auto text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <!-- Pesan 404 -->
      <h1 class="text-6xl font-bold text-white mb-4">404</h1>
      <p class="text-2xl text-white mb-8">Oops! Halaman yang Anda cari tidak ditemukan.</p>

      <!-- Tombol Kembali ke Home -->
      <router-link
        to="/"
        class="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-tertiary hover:text-white transition-colors duration-200"
      >
        Kembali ke Beranda
      </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* Animasi bounce */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>
