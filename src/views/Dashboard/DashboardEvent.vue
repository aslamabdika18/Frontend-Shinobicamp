<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Event Management</h1>

    <!-- Tombol Tambah Event -->
    <div class="flex justify-start mb-4">
    <router-link
      to="/dashboard/crud-menu/addevent"
      class="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition-colors flex items-center"
    >
      <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
      Tambah Event
    </router-link>
  </div>

    <!-- Tabel Daftar Event (Desktop) -->
    <div class="hidden md:block">
      <table class="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-3 px-4 text-left">Event Name</th>
            <th class="py-3 px-4 text-left">Poster</th>
            <th class="py-3 px-4 text-left">Description</th>
            <th class="py-3 px-4 text-left">Location</th>
            <th class="py-3 px-4 text-left">Register Deadline</th>
            <th class="py-3 px-4 text-left">Status</th>
            <th class="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.id" class="border-b">
            <td class="py-3 px-4">{{ event.name }}</td>
            <td class="py-3 px-4">
              <img :src="event.poster" alt="Poster" class="w-16 h-16 object-cover rounded" />
            </td>
            <td class="py-3 px-4">{{ event.description }}</td>
            <td class="py-3 px-4">{{ event.location }}</td>
            <td class="py-3 px-4">{{ event.registration_deadline }}</td>
            <td class="py-3 px-4">
              <span
                :class="{
                  'bg-green-100 text-green-800': event.status === 'Aktif',
                  'bg-red-100 text-red-800': event.status === 'Nonaktif',
                }"
                class="px-3 py-1 rounded-full text-sm"
              >
                {{ event.status }}
              </span>
            </td>
            <td class="py-3 px-4">
              <button
                @click="showDetail(event)"
                class="bg-green-500 text-white px-3 py-2 rounded mr-2 hover:bg-green-600 transition-colors"
              >
                <font-awesome-icon :icon="['fas', 'info-circle']" />
              </button>
              <button
                @click="editEvent(event)"
                class="bg-yellow-500 text-white px-3 py-2 rounded mr-2 hover:bg-yellow-600 transition-colors"
              >
                <font-awesome-icon :icon="['fas', 'edit']" />
              </button>
              <button
                @click="deleteEvent(event.id)"
                class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
              >
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Card Daftar Event (Mobile) -->
    <div class="block md:hidden">
      <div v-for="event in events" :key="event.id" class="bg-white rounded-lg shadow-md p-4 mb-4">
        <div class="mb-2"><strong>Event Name:</strong> {{ event.name }}</div>
        <div class="mb-2">
          <strong>Poster:</strong>
          <img :src="event.poster" alt="Poster" class="w-16 h-16 object-cover rounded mt-1" />
        </div>
        <div class="mb-2"><strong>Description:</strong> {{ event.description }}</div>
        <div class="mb-2"><strong>Location:</strong> {{ event.location }}</div>
        <div class="mb-2">
          <strong>Register Deadline:</strong> {{ event.registration_deadline }}
        </div>
        <div class="mb-2">
          <strong>Status:</strong>
          <span
            :class="{
              'bg-green-100 text-green-800': event.status === 'Aktif',
              'bg-red-100 text-red-800': event.status === 'Nonaktif',
            }"
            class="px-3 py-1 rounded-full text-sm"
          >
            {{ event.status }}
          </span>
        </div>
        <div class="flex space-x-2">
          <button
            @click="showDetail(event)"
            class="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition-colors"
          >
            <font-awesome-icon :icon="['fas', 'info-circle']" />
          </button>
          <button
            @click="editEvent(event)"
            class="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition-colors"
          >
            <font-awesome-icon :icon="['fas', 'edit']" />
          </button>
          <button
            @click="deleteEvent(event.id)"
            class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
          >
            <font-awesome-icon :icon="['fas', 'trash']" />
          </button>
        </div>
      </div>
    </div>

    <!-- Modal untuk Detail Event -->
    <div
      v-if="isDetailModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Detail Event</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Kolom Kiri: Informasi Utama -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Event Name</label>
              <p class="mt-1 text-lg font-semibold text-gray-900">{{ detailEvent.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Poster</label>
              <img
                :src="detailEvent.poster"
                alt="Poster"
                class="mt-2 w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <p class="mt-1 text-gray-700">{{ detailEvent.description }}</p>
            </div>
          </div>

          <!-- Kolom Kanan: Informasi Tambahan -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Proposal</label>
              <p class="mt-1 text-gray-700">{{ detailEvent.proposal }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Slug</label>
              <p class="mt-1 text-gray-700">{{ detailEvent.slug }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Location</label>
              <p class="mt-1 text-gray-700">{{ detailEvent.location }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">First Event Date</label>
              <p class="mt-1 text-gray-700">{{ detailEvent.first_event_date }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Last Event Date</label>
              <p class="mt-1 text-gray-700">{{ detailEvent.last_event_date }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Register Deadline</label>
              <p class="mt-1 text-gray-700">{{ detailEvent.registration_deadline }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <span
                :class="{
                  'bg-green-100 text-green-800': detailEvent.status === 'Aktif',
                  'bg-red-100 text-red-800': detailEvent.status === 'Nonaktif',
                }"
                class="px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ detailEvent.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Tombol Tutup -->
        <div class="mt-6 flex justify-end">
          <button
            type="button"
            @click="closeDetailModal"
            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Data dummy untuk event
const events = ref([
  {
    id: 1,
    name: 'Event 1',
    poster: 'https://via.placeholder.com/150',
    proposal: 'Proposal Event 1',
    slug: 'event-1',
    description: 'Deskripsi Event 1',
    location: 'Jakarta',
    first_event_date: '2023-10-01',
    last_event_date: '2023-10-05',
    registration_deadline: '2023-09-25',
    status: 'Aktif',
  },
  {
    id: 2,
    name: 'Event 2',
    poster: 'https://via.placeholder.com/150',
    proposal: 'Proposal Event 2',
    slug: 'event-2',
    description: 'Deskripsi Event 2',
    location: 'Bandung',
    first_event_date: '2023-11-01',
    last_event_date: '2023-11-05',
    registration_deadline: '2023-10-25',
    status: 'Nonaktif',
  },
])

// State untuk modal detail
const isDetailModalOpen = ref(false)
const detailEvent = ref({
  id: null,
  name: '',
  poster: '',
  proposal: '',
  slug: '',
  description: '',
  location: '',
  first_event_date: '',
  last_event_date: '',
  registration_deadline: '',
  status: '',
})

// Buka modal untuk detail event
const showDetail = (event) => {
  detailEvent.value = { ...event }
  isDetailModalOpen.value = true
}

// Hapus event
const deleteEvent = (id) => {
  events.value = events.value.filter((event) => event.id !== id)
}

// Tutup modal detail
const closeDetailModal = () => {
  isDetailModalOpen.value = false
}
</script>
