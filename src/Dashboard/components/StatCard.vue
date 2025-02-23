<template>
  <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div class="text-3xl mr-4">{{ icon }}</div>
    <div>
      <h3 class="text-gray-600 text-sm">{{ title }}</h3>
      <p class="text-2xl font-bold">{{ value }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  icon: String,
})
</script>
