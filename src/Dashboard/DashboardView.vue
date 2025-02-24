<template>
  <div class="min-h-screen bg-gray-100 flex flex-col md:flex-row">
    <!-- Sidebar -->
    <SidebarCompo ref="sidebar" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <HeaderCompo @toggle-sidebar="toggleSidebar" />

      <!-- Main Area -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
        <!-- Ini adalah area untuk menampilkan konten dari setiap menu -->
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SidebarCompo from '../Dashboard/components/SidebarCompo.vue'
import HeaderCompo from '../Dashboard/components/HeaderCompo.vue'

// Ref untuk sidebar
const sidebar = ref(null)

// Fungsi untuk toggle sidebar
const toggleSidebar = () => {
  sidebar.value.toggleSidebar()
}
</script>
