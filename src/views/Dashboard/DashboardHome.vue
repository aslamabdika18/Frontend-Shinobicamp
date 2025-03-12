<template>
  <div>
    <!-- Judul -->
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <!-- Statistik -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Total Pengguna -->
      <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div class="bg-blue-100 p-3 rounded-full mr-4">
          <font-awesome-icon :icon="['fas', 'users']" class="text-blue-500 text-xl" />
        </div>
        <div>
          <p class="text-gray-500">Total Pengguna</p>
          <p class="text-2xl font-bold">1,234</p>
        </div>
      </div>

      <!-- Total Pesanan -->
      <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div class="bg-green-100 p-3 rounded-full mr-4">
          <font-awesome-icon :icon="['fas', 'box']" class="text-green-500 text-xl" />
        </div>
        <div>
          <p class="text-gray-500">Total Pesanan</p>
          <p class="text-2xl font-bold">567</p>
        </div>
      </div>

      <!-- Pendapatan -->
      <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div class="bg-purple-100 p-3 rounded-full mr-4">
          <font-awesome-icon :icon="['fas', 'money-bill']" class="text-purple-500 text-xl" />
        </div>
        <div>
          <p class="text-gray-500">Pendapatan</p>
          <p class="text-2xl font-bold">Rp 12,345,000</p>
        </div>
      </div>

      <!-- Pengunjung -->
      <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div class="bg-yellow-100 p-3 rounded-full mr-4">
          <font-awesome-icon :icon="['fas', 'eye']" class="text-yellow-500 text-xl" />
        </div>
        <div>
          <p class="text-gray-500">Pengunjung</p>
          <p class="text-2xl font-bold">8,910</p>
        </div>
      </div>
    </div>

    <!-- Grafik -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Grafik Pendapatan Bulanan -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4 flex items-center">
          <font-awesome-icon :icon="['fas', 'chart-line']" class="text-blue-500 mr-2" />
          Pendapatan Bulanan
        </h2>
        <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p class="text-gray-500">Grafik akan ditampilkan di sini</p>
        </div>
      </div>

      <!-- Grafik Pengunjung Harian -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4 flex items-center">
          <font-awesome-icon :icon="['fas', 'calendar-alt']" class="text-green-500 mr-2" />
          Pengunjung Harian
        </h2>
        <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p class="text-gray-500">Grafik akan ditampilkan di sini</p>
        </div>
      </div>
    </div>

    <!-- Tabel Data Terbaru -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-4">Data Terbaru</h2>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2">ID</th>
            <th class="py-2">Nama</th>
            <th class="py-2">Tanggal</th>
            <th class="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
            <td class="py-2 text-center">{{ item.id }}</td>
            <td class="py-2 text-center">{{ item.name }}</td>
            <td class="py-2 text-center">{{ item.date }}</td>
            <td class="py-2 text-center">
              <span
                :class="`px-2 py-1 rounded ${item.status === 'Aktif' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`"
              >
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// Data dummy untuk tabel
const data = [
  { id: 1, name: 'Event 1', date: '2023-10-01', status: 'Aktif' },
  { id: 2, name: 'Event 2', date: '2023-10-15', status: 'Tidak Aktif' },
  { id: 3, name: 'Event 3', date: '2023-10-20', status: 'Aktif' },
]
</script>

<style scoped>
/* Tambahkan gaya kustom jika diperlukan */
</style>
