<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Event Management</h1>

    <!-- Tombol Tambah Event -->
    <button
      @click="openCreateModal"
      class="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition-colors"
    >
      Tambah Event
    </button>

    <!-- Tabel Daftar Event (Desktop) -->
    <div class="hidden md:block">
      <table class="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-3 px-4 text-left">Nama Event</th>
            <th class="py-3 px-4 text-left">Tanggal</th>
            <th class="py-3 px-4 text-left">Lokasi</th>
            <th class="py-3 px-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.id" class="border-b">
            <td class="py-3 px-4">{{ event.name }}</td>
            <td class="py-3 px-4">{{ event.date }}</td>
            <td class="py-3 px-4">{{ event.location }}</td>
            <td class="py-3 px-4">
              <button
                @click="editEvent(event)"
                class="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
              <button
                @click="deleteEvent(event.id)"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Card Daftar Event (Mobile) -->
    <div class="block md:hidden">
      <div v-for="event in events" :key="event.id" class="bg-white rounded-lg shadow-md p-4 mb-4">
        <div class="mb-2"><strong>Nama Event:</strong> {{ event.name }}</div>
        <div class="mb-2"><strong>Tanggal:</strong> {{ event.date }}</div>
        <div class="mb-2"><strong>Lokasi:</strong> {{ event.location }}</div>
        <div class="flex space-x-2">
          <button
            @click="editEvent(event)"
            class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
          >
            Edit
          </button>
          <button
            @click="deleteEvent(event.id)"
            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Modal untuk Tambah/Edit Event -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white p-6 rounded-lg w-full md:w-1/2 lg:w-1/3">
        <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Event' : 'Tambah Event' }}</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block text-gray-700">Nama Event</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Tanggal</label>
            <input
              v-model="form.date"
              type="date"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Lokasi</label>
            <input
              v-model="form.location"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="closeModal"
              class="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              {{ isEditing ? 'Update' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Data dummy untuk event
const events = ref([
  { id: 1, name: 'Event 1', date: '2023-10-01', location: 'Jakarta' },
  { id: 2, name: 'Event 2', date: '2023-10-15', location: 'Bandung' },
])

// State untuk modal dan form
const isModalOpen = ref(false)
const isEditing = ref(false)
const form = ref({
  id: null,
  name: '',
  date: '',
  location: '',
})

// Buka modal untuk tambah event
const openCreateModal = () => {
  isEditing.value = false
  form.value = { id: null, name: '', date: '', location: '' }
  isModalOpen.value = true
}

// Buka modal untuk edit event
const editEvent = (event) => {
  isEditing.value = true
  form.value = { ...event }
  isModalOpen.value = true
}

// Hapus event
const deleteEvent = (id) => {
  events.value = events.value.filter((event) => event.id !== id)
}

// Submit form (tambah/edit event)
const submitForm = () => {
  if (isEditing.value) {
    // Update event
    const index = events.value.findIndex((event) => event.id === form.value.id)
    events.value[index] = { ...form.value }
  } else {
    // Tambah event baru
    events.value.push({ ...form.value, id: events.value.length + 1 })
  }
  closeModal()
}

// Tutup modal
const closeModal = () => {
  isModalOpen.value = false
}
</script>

<style scoped>
/* Tambahkan gaya kustom jika diperlukan */
</style>
