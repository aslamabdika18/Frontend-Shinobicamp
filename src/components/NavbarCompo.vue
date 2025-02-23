<template>
  <nav
    class="bg-primary p-4 text-white sticky top-0 z-50 transition-all duration-300"
    :class="{ 'opacity-70 shadow-lg': isScrolled }"
  >
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo/Brand -->
      <div class="text-2xl font-bold">Shinobicamp</div>

      <!-- Tombol Toggle untuk Mobile -->
      <button @click="toggleMenu" class="md:hidden focus:outline-none">
        <svg
          class="w-6 h-6 transition-transform duration-300"
          :class="{ 'rotate-90': isMenuOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <!-- Menu Navigasi -->
      <div
        :class="[
          'md:flex md:space-x-4 md:items-center',
          { hidden: !isMenuOpen, 'flex flex-col items-center justify-center': isMenuOpen },
          'absolute md:static top-16 left-0 w-full md:w-auto bg-primary md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out transform',
          {
            'translate-y-0 opacity-100': isMenuOpen,
            '-translate-y-4 opacity-0 md:translate-y-0 md:opacity-100': !isMenuOpen,
          },
        ]"
      >
        <!-- Home Link dengan Efek Garis Bawah -->
        <router-link
          to="/"
          class="block md:inline-block py-2 md:py-0 relative hover:text-tertiary transition-colors duration-200"
          @click="closeMenu"
        >
          Home
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-tertiary transition-all duration-300 group-hover:w-full"></span>
        </router-link>

        <!-- Events Link dengan Efek Garis Bawah -->
        <router-link
          to="/events"
          class="block md:inline-block py-2 md:py-0 relative hover:text-tertiary transition-colors duration-200"
          @click="closeMenu"
        >
          Events
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-tertiary transition-all duration-300 group-hover:w-full"></span>
        </router-link>

        <!-- About Link dengan Efek Garis Bawah -->
        <router-link
          to="/about"
          class="block md:inline-block py-2 md:py-0 relative hover:text-tertiary transition-colors duration-200"
          @click="closeMenu"
        >
          About
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-tertiary transition-all duration-300 group-hover:w-full"></span>
        </router-link>

        <!-- Tombol Login -->
        <router-link
          to="/signin"
          class="block md:inline-block bg-secondary text-white px-4 py-2 rounded-lg hover:bg-tertiary hover:text-primary transition-colors duration-200 mt-4 md:mt-0"
          @click="closeMenu"
        >
          Sign In
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// State untuk toggle menu
const isMenuOpen = ref(false)

// State untuk efek scroll
const isScrolled = ref(false)

// Fungsi untuk toggle menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Fungsi untuk menutup menu setelah mengklik link
const closeMenu = () => {
  if (window.innerWidth < 768) {
    // Hanya tutup menu di layar kecil
    isMenuOpen.value = false
  }
}

// Fungsi untuk handle scroll
const handleScroll = () => {
  if (window.scrollY > 50) {
    // Jika scroll lebih dari 50px
    isScrolled.value = true
  } else {
    isScrolled.value = false
  }
}

// Tambahkan event listener saat komponen di-mount
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// Hapus event listener saat komponen di-unmount
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Tidak perlu CSS kustom, semua diatur dengan Tailwind */
</style>
