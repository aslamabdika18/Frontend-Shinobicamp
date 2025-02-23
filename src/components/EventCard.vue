<template>
  <div
    class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
  >
    <!-- Gambar Event (Portrait) -->
    <div class="w-full h-96 overflow-hidden">
      <!-- Tinggi gambar disesuaikan -->
      <img :src="event.image" :alt="event.name" class="w-full h-full object-cover" />
    </div>

    <!-- Konten Card -->
    <div class="p-6">
      <!-- Nama Event -->
      <h3 class="text-xl font-bold text-gray-800 mb-2">{{ event.name }}</h3>

      <!-- Deskripsi Event -->
      <p class="text-gray-600 mb-4">{{ event.description }}</p>

      <!-- Tanggal Event -->
      <div class="flex items-center text-gray-600 mb-4">
        <i class="fas fa-calendar-alt mr-2"></i>
        <span>{{ event.date }}</span>
      </div>

      <!-- Lokasi Event -->
      <div class="flex items-center text-gray-600 mb-4">
        <i class="fas fa-map-marker-alt mr-2"></i>
        <span>{{ event.location }}</span>
      </div>

      <!-- Tombol Lihat Detail -->
      <router-link
        :to="`/event/${event.id}`"
        class="bg-tertiary text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
      >
        Lihat Detail
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Definisikan props untuk menerima data event
defineProps({
  event: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>
