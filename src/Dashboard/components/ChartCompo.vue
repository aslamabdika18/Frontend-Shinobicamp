<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-bold mb-4">{{ title }}</h3>
    <div class="h-64 bg-gray-100 flex items-center justify-center">
      <span class="text-gray-500">Grafik akan ditampilkan di sini</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
})
</script>
