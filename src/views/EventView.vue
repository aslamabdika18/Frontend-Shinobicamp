<template>
  <div class="bg-white min-h-screen p-8">
    <h1 class="text-4xl font-bold text-primary mb-8">Upcoming Events</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Gunakan Komponen EventCard -->
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="{
          id: event.id,
          name: event.title,
          description: event.description,
          date: event.date,
          location: event.location,
          image: event.image, // Gunakan URL gambar portrait
        }"
      />
    </div>
  </div>
</template>

<script setup>
// Impor komponen EventCard
import EventCard from '@/components/EventCard.vue'

// Data event dengan gambar portrait
const events = [
  {
    id: 1,
    title: 'Karate Championship 2023',
    description: 'Join the biggest karate event of the year!',
    date: '2023-12-15',
    location: 'Jakarta Convention Center',
    image: 'https://via.placeholder.com/300x400', // Contoh gambar portrait
  },
  {
    id: 2,
    title: 'Winter Training Camp',
    description: 'Improve your skills with our professional trainers.',
    date: '2024-01-20',
    location: 'Bandung City Hall',
    image: 'https://via.placeholder.com/300x400', // Contoh gambar portrait
  },
  {
    id: 3,
    title: 'Spring Seminar',
    description: 'Learn advanced techniques from masters.',
    date: '2024-03-10',
    location: 'Surabaya Sports Center',
    image: 'https://via.placeholder.com/300x400', // Contoh gambar portrait
  },
]
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>
