<template>
  <div>
    <!-- Overlay (Hanya ditampilkan di mobile saat sidebar terbuka) -->
    <div
      v-if="isSidebarOpen"
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-200"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="`w-64 bg-white shadow-lg rounded-lg fixed h-screen transform transition-transform duration-200 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 z-30 m-4`"
    >
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-2xl font-bold text-primary">Shinobicamp</h2>
      </div>
      <nav class="mt-4">
        <!-- Dashboard Home -->
        <router-link
          to="/dashboard"
          class="block py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          Dashboard
        </router-link>

        <!-- Events -->
        <router-link
          to="/dashboard/events"
          class="block py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          Events
        </router-link>

        <!-- Teams -->
        <router-link
          to="/dashboard/teams"
          class="block py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          Teams
        </router-link>

        <!-- Coaches -->
        <router-link
          to="/dashboard/coaches"
          class="block py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          Coaches
        </router-link>

        <!-- Classcamp -->
        <router-link
          to="/dashboard/classcamp"
          class="block py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          Classcamp
        </router-link>

        <!-- Categories -->
        <router-link
          to="/dashboard/categories"
          class="block py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          Categories
        </router-link>

        <!-- Brackets -->
        <router-link
          to="/dashboard/brackets"
          class="block py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          Brackets
        </router-link>

        <!-- Schedules -->
        <router-link
          to="/dashboard/schedules"
          class="block py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          Schedules
        </router-link>

        <!-- Payments -->
        <router-link
          to="/dashboard/payments"
          class="block py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          Payments
        </router-link>
      </nav>
    </aside>

    <!-- Konten Utama -->
    <main class="md:ml-64 p-4">
      <!-- Konten Anda di sini -->
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// State untuk toggle sidebar
const isSidebarOpen = ref(false)

// Fungsi untuk toggle sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Expose state dan fungsi ke parent component
defineExpose({
  isSidebarOpen,
  toggleSidebar,
})
</script>

<style scoped>
/* Tambahkan gaya kustom jika diperlukan */
</style>
