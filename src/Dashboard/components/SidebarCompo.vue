<template>
  <div>
    <!-- Overlay (Hanya ditampilkan di mobile saat sidebar terbuka) -->
    <div
      v-if="isSidebarOpen"
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-200"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="`${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      } bg-white shadow-lg rounded-lg fixed h-screen transform transition-all duration-200 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 z-30 m-4`"
    >
      <div class="p-6 border-b border-gray-200 flex items-center justify-between">
        <h2 v-if="!isSidebarCollapsed" class="text-2xl font-bold text-primary">Shinobicamp</h2>
        <button @click="toggleSidebarCollapse" class="text-gray-700 hover:text-gray-900">
          <font-awesome-icon :icon="['fas', isSidebarCollapsed ? 'angle-double-right' : 'angle-double-left']" />
        </button>
      </div>
      <nav class="mt-4">
        <!-- Dashboard Home -->
        <router-link
          to="/dashboard"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          <font-awesome-icon :icon="['fas', 'home']" :class="{ 'mr-3': !isSidebarCollapsed }" />
          <span v-if="!isSidebarCollapsed">Dashboard</span>
        </router-link>

        <!-- Events -->
        <router-link
          to="/dashboard/events"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          <font-awesome-icon :icon="['fas', 'calendar']" :class="{ 'mr-3': !isSidebarCollapsed }" />
          <span v-if="!isSidebarCollapsed">Events</span>
        </router-link>

        <!-- Teams -->
        <router-link
          to="/dashboard/teams"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          <font-awesome-icon :icon="['fas', 'users']" :class="{ 'mr-3': !isSidebarCollapsed }" />
          <span v-if="!isSidebarCollapsed">Teams</span>
        </router-link>

        <!-- Coaches -->
        <router-link
          to="/dashboard/coaches"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          <font-awesome-icon :icon="['fas', 'chalkboard-teacher']" :class="{ 'mr-3': !isSidebarCollapsed }" />
          <span v-if="!isSidebarCollapsed">Coaches</span>
        </router-link>

        <!-- Classcamp -->
        <router-link
          to="/dashboard/classcamp"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          <font-awesome-icon :icon="['fas', 'campground']" :class="{ 'mr-3': !isSidebarCollapsed }" />
          <span v-if="!isSidebarCollapsed">Classcamp</span>
        </router-link>

        <!-- Categories -->
        <router-link
          to="/dashboard/categories"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          <font-awesome-icon :icon="['fas', 'list']" :class="{ 'mr-3': !isSidebarCollapsed }" />
          <span v-if="!isSidebarCollapsed">Categories</span>
        </router-link>

        <!-- Brackets -->
        <router-link
          to="/dashboard/brackets"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          <font-awesome-icon :icon="['fas', 'project-diagram']" :class="{ 'mr-3': !isSidebarCollapsed }" />
          <span v-if="!isSidebarCollapsed">Brackets</span>
        </router-link>

        <!-- Schedules -->
        <router-link
          to="/dashboard/schedules"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          <font-awesome-icon :icon="['fas', 'clock']" :class="{ 'mr-3': !isSidebarCollapsed }" />
          <span v-if="!isSidebarCollapsed">Schedules</span>
        </router-link>

        <!-- Payments -->
        <router-link
          to="/dashboard/payments"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
        >
          <font-awesome-icon :icon="['fas', 'credit-card']" :class="{ 'mr-3': !isSidebarCollapsed }" />
          <span v-if="!isSidebarCollapsed">Payments</span>
        </router-link>
      </nav>
    </aside>

    <!-- Konten Utama -->
    <main :class="`${
      isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
    } p-4 transition-all duration-200 ease-in-out`">
      <!-- Konten Anda di sini -->
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// State untuk toggle sidebar
const isSidebarOpen = ref(false)
const isSidebarCollapsed = ref(false)

// Fungsi untuk toggle sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Fungsi untuk toggle sidebar collapse
const toggleSidebarCollapse = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

// Expose state dan fungsi ke parent component
defineExpose({
  isSidebarOpen,
  toggleSidebar,
  isSidebarCollapsed,
  toggleSidebarCollapse,
})
</script>
