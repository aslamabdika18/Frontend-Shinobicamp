<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar hanya ditampilkan jika meta.noNavbarFooter tidak true DAN bukan halaman dashboard -->
    <NavbarCompo v-if="!route.meta.noNavbarFooter && !isDashboardRoute" />

    <!-- Router View -->
    <router-view class="flex-grow" />

    <!-- Footer hanya ditampilkan jika meta.noNavbarFooter tidak true DAN bukan halaman dashboard -->
    <FooterCompo v-if="!route.meta.noNavbarFooter && !isDashboardRoute" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavbarCompo from './components/NavbarCompo.vue'
import FooterCompo from './components/FooterCompo.vue'

const route = useRoute()

// Cek apakah route saat ini adalah dashboard
const isDashboardRoute = computed(() => {
  return route.path.startsWith('/dashboard')
})
</script>
