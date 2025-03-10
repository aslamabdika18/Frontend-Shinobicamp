<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">{{ isEditing ? 'Edit Event' : 'Tambah Event' }}</h1>

    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Left Column: Main Information -->
      <div class="space-y-4">
        <FormInput v-model="form.name" label="Event Name" required />
        <FormInput v-model="form.poster" label="Poster URL" required />
        <FormTextarea v-model="form.description" label="Description" required />
      </div>

      <!-- Right Column: Additional Information -->
      <div class="space-y-4">
        <FormInput v-model="form.proposal" label="Proposal" required />
        <FormInput v-model="form.location" label="Location" required />
        <FormInput v-model="form.first_event_date" label="First Event Date" type="date" required />
        <FormInput v-model="form.last_event_date" label="Last Event Date" type="date" required />
        <FormInput v-model="form.registration_deadline" label="Register Deadline" type="date" required />
        <FormSelect v-model="form.status" label="Status" :options="statusOptions" required />
      </div>

      <!-- Action Buttons -->
      <div class="md:col-span-2 flex justify-end space-x-4">
        <router-link
          to="/dashboard/events"
          class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Batal
        </router-link>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Loading...' : isEditing ? 'Update' : 'Simpan' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormInput from '@/Dashboard/components/FormInput.vue'
import FormTextarea from '@/Dashboard/components/FormTextarea.vue'
import FormSelect from '@/Dashboard/components/FormSelect.vue'

const route = useRoute()
const router = useRouter()

const form = ref({
  id: null,
  name: '',
  poster: '',
  proposal: '',
  description: '',
  location: '',
  first_event_date: new Date().toISOString().split('T')[0],
  last_event_date: new Date().toISOString().split('T')[0],
  registration_deadline: new Date().toISOString().split('T')[0],
  status: 'Aktif',
})

const statusOptions = [
  { value: 'Aktif', label: 'Aktif' },
  { value: 'Nonaktif', label: 'Nonaktif' },
]

const isEditing = computed(() => !!route.params.eventId)
const isLoading = ref(false)

// Fetch event data if in edit mode
if (isEditing.value) {
  const fetchEventData = async () => {
    try {
      const response = await fetch(`/api/events/${route.params.eventId}`)
      const eventData = await response.json()
      form.value = { ...eventData }
    } catch (error) {
      console.error('Error fetching event data:', error)
    }
  }
  fetchEventData()
}

// Submit form (create or update)
const submitForm = async () => {
  isLoading.value = true
  try {
    if (isEditing.value) {
      await updateEvent(form.value)
      alert('Event berhasil diupdate!')
    } else {
      await createEvent(form.value)
      alert('Event berhasil ditambahkan!')
    }
    router.push('/dashboard/events')
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Terjadi kesalahan. Silakan coba lagi.')
  } finally {
    isLoading.value = false
  }
}

// Implementasi fungsi API
async function updateEvent(eventData) {
  const response = await fetch(`/api/events/${eventData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  })
  if (!response.ok) {
    throw new Error('Gagal mengupdate event')
  }
  return await response.json()
}

async function createEvent(eventData) {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  })
  if (!response.ok) {
    throw new Error('Gagal menambahkan event')
  }
  return await response.json()
}
</script>
