<template>
  <header
    class="bg-white shadow-lg p-4 flex justify-between items-center rounded-md mx-4 mt-4 z-10"
  >
    <!-- Tombol Toggle (Hanya ditampilkan di mobile) -->
    <button
      @click="toggleSidebar"
      class="md:hidden p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-200"
    >
      <font-awesome-icon :icon="['fas', 'bars']" class="w-6 h-6 text-gray-700" />
    </button>

    <!-- Judul dinamis berdasarkan route -->
    <h1 class="text-xl font-bold text-gray-800">{{ pageTitle }}</h1>

    <!-- Dropdown User -->
    <div class="flex items-center space-x-4">
      <!-- Tombol Notifikasi (Hanya ditampilkan di desktop) -->
      <button class="hidden md:block text-gray-600 hover:text-primary">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>

      <!-- Dropdown User -->
      <div class="relative">
        <!-- Tampilkan ikon profil dan nama user -->
        <div class="flex items-center space-x-2 cursor-pointer" @click="toggleDropdown">
          <!-- Ikon Profil -->
          <font-awesome-icon :icon="['fas', 'circle-user']" class="w-6 h-6 text-gray-700" />
          <!-- Nama User (Hanya ditampilkan di desktop) -->
          <span class="hidden md:block text-gray-700">{{ user.name }}</span>
        </div>

        <!-- Dropdown Menu -->
        <div
          v-if="isDropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
        >
          <router-link
            to="/profile"
            class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            @click="closeDropdown"
          >
            Profile
          </router-link>
          <button
            @click="logout"
            class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// State untuk dropdown
const isDropdownOpen = ref(false)

// Data dummy pengguna yang login
const user = ref({
  name: 'John Doe', // Nama user dummy
})

// Fungsi untuk toggle dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// Fungsi untuk menutup dropdown
const closeDropdown = () => {
  isDropdownOpen.value = false
}

// Fungsi untuk logout
const logout = () => {
  // Tambahkan logika logout di sini
  alert('Logout berhasil!')
  isDropdownOpen.value = false
}

// Ambil route yang aktif
const route = useRoute()

// Judul dinamis berdasarkan route
const pageTitle = computed(() => {
  switch (route.path) {
    case '/dashboard':
      return 'Dashboard'
    case '/dashboard/events':
      return 'Events'
    case '/dashboard/teams':
      return 'Teams'
    case '/dashboard/coaches':
      return 'Coaches'
    case '/dashboard/classcamp':
      return 'Classcamp'
    case '/dashboard/categories':
      return 'Categories'
    case '/dashboard/brackets':
      return 'Brackets'
    case '/dashboard/schedules':
      return 'Schedules'
    case '/dashboard/payments':
      return 'Payments'
    default:
      return 'Dashboard'
  }
})

// Fungsi untuk toggle sidebar (dikirim dari parent component)
const emit = defineEmits(['toggle-sidebar'])
const toggleSidebar = () => {
  emit('toggle-sidebar')
}
</script>

<style scoped>
/* Tambahkan gaya kustom jika diperlukan */
</style>
