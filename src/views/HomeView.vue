<template>
  <div class="bg-quaternary min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative py-20 bg-cover bg-center"
      :style="{ backgroundImage: `url(${heroImage})` }"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="container mx-auto px-6 text-center text-white relative z-10">
        <h1 class="text-5xl font-bold mb-6">Selamat Datang di Shinobicamp</h1>
        <p class="text-xl mb-8">
          Platform terbaik untuk manajemen dan pendaftaran event karate. Mudah, cepat, dan efisien.
        </p>
        <router-link
          to="/signup"
          class="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
        >
          Daftar Sekarang
        </router-link>
      </div>
    </section>

    <!-- Event List Section -->
    <section class="py-16">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Daftar Event Karate</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Gunakan Komponen EventCard -->
          <EventCard v-for="event in events" :key="event.id" :event="event" />
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="bg-gradient-to-r from-primary to-secondary py-16">
      <div class="container mx-auto px-6 text-center text-white">
        <h2 class="text-3xl font-bold mb-4">Siap Mendaftarkan Tim Anda?</h2>
        <p class="text-xl mb-8">
          Jangan lewatkan kesempatan untuk berpartisipasi dalam event karate terbaik.
        </p>
        <router-link
          to="/signup"
          class="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
        >
          Daftar Sekarang
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
// Impor gambar hero.jpg dari folder assets
import heroImage from '@/assets/images/hero.jpg'

// Impor komponen EventCard
import EventCard from '@/components/EventCard.vue'

// Contoh data event (bisa diganti dengan data dari API)
const events = [
  {
    id: 1,
    name: 'Kejuaraan Karate Nasional 2023',
    description: 'Event karate nasional terbesar di Indonesia.',
    date: '15 November 2023',
    location: 'Jakarta Convention Center',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    id: 2,
    name: 'Turnamen Karate Jawa Barat',
    description: 'Turnamen karate tingkat Jawa Barat.',
    date: '25 November 2023',
    location: 'Bandung City Hall',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    id: 3,
    name: 'Open Karate Championship 2023',
    description: 'Event karate terbuka untuk semua usia.',
    date: '10 Desember 2023',
    location: 'Surabaya Sports Center',
    image: 'https://via.placeholder.com/400x200',
  },
]
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>
