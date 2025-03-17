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
          <font-awesome-icon
            :icon="['fas', isSidebarCollapsed ? 'angle-double-right' : 'angle-double-left']"
          />
        </button>
      </div>

      <!-- User Info Section -->
      <div
        v-if="authStore.isAuthenticated && !isSidebarCollapsed"
        class="px-6 py-4 border-b border-gray-200"
      >
        <div class="flex items-center">
          <font-awesome-icon :icon="['fas', 'circle-user']" class="text-xl text-gray-700 mr-3" />
          <div>
            <p class="font-medium text-gray-800">{{ authStore.user?.name || 'User' }}</p>
            <p class="text-sm text-gray-500">{{ authStore.roles[0] || 'User' }}</p>
          </div>
        </div>
      </div>

      <nav class="mt-4">
        <!-- Dashboard Home - Available to all authenticated users -->
        <router-link
          to="/dashboard"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center w-full px-0 mx-auto': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
          v-if="authStore.isAuthenticated"
        >
          <font-awesome-icon :icon="['fas', 'home']" class="text-center" />
          <span v-if="!isSidebarCollapsed" class="ml-3">Dashboard</span>
        </router-link>

        <!-- Events - Admin only -->
        <router-link
          to="/dashboard/events"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center w-full px-0 mx-auto': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
          v-if="authStore.isAdmin"
        >
          <font-awesome-icon :icon="['fas', 'calendar']" class="text-center" />
          <span v-if="!isSidebarCollapsed" class="ml-3">Events</span>
        </router-link>

        <!-- Teams - For admin and coach -->
        <router-link
          to="/dashboard/teams"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center w-full px-0 mx-auto': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
          v-if="authStore.hasAnyRole(['admin', 'coach'])"
        >
          <font-awesome-icon :icon="['fas', 'users']" class="text-center" />
          <span v-if="!isSidebarCollapsed" class="ml-3">Teams</span>
        </router-link>

        <!-- Coaches - For admin and coach -->
        <router-link
          to="/dashboard/coaches"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center w-full px-0 mx-auto': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
          v-if="authStore.hasAnyRole(['admin', 'coach'])"
        >
          <font-awesome-icon :icon="['fas', 'chalkboard-teacher']" class="text-center" />
          <span v-if="!isSidebarCollapsed" class="ml-3">Coaches</span>
        </router-link>

        <!-- Classcamp - Admin only -->
        <router-link
          to="/dashboard/classcamp"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center w-full px-0 mx-auto': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
          v-if="authStore.isAdmin"
        >
          <font-awesome-icon :icon="['fas', 'campground']" class="text-center" />
          <span v-if="!isSidebarCollapsed" class="ml-3">Classcamp</span>
        </router-link>

        <!-- Categories - Admin only -->
        <router-link
          to="/dashboard/categories"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center w-full px-0 mx-auto': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
          v-if="authStore.isAdmin"
        >
          <font-awesome-icon :icon="['fas', 'list']" class="text-center" />
          <span v-if="!isSidebarCollapsed" class="ml-3">Categories</span>
        </router-link>

        <!-- Brackets - Admin only -->
        <router-link
          to="/dashboard/brackets"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center w-full px-0 mx-auto': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
          v-if="authStore.isAdmin"
        >
          <font-awesome-icon :icon="['fas', 'project-diagram']" class="text-center" />
          <span v-if="!isSidebarCollapsed" class="ml-3">Brackets</span>
        </router-link>

        <!-- Schedules - Admin only -->
        <router-link
          to="/dashboard/schedules"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center w-full px-0 mx-auto': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
          v-if="authStore.isAdmin"
        >
          <font-awesome-icon :icon="['fas', 'clock']" class="text-center" />
          <span v-if="!isSidebarCollapsed" class="ml-3">Schedules</span>
        </router-link>

        <!-- Payments - For admin and coach -->
        <router-link
          to="/dashboard/payments"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200"
          :class="{ 'justify-center w-full px-0 mx-auto': isSidebarCollapsed }"
          active-class="bg-gray-100 font-semibold"
          exact-active-class="bg-gray-100 font-semibold"
          v-if="authStore.hasAnyRole(['admin', 'coach'])"
        >
          <font-awesome-icon :icon="['fas', 'credit-card']" class="text-center" />
          <span v-if="!isSidebarCollapsed" class="ml-3">Payments</span>
        </router-link>

        <!-- Divider -->
        <div v-if="authStore.isAuthenticated && !isSidebarCollapsed" class="my-2 mx-4 border-t border-gray-200"></div>

        <!-- Logout Button -->
        <button
          @click="logout"
          class="flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 rounded-lg mx-4 transition-colors duration-200 w-full"
          :class="{ 'justify-center px-0 mx-auto': isSidebarCollapsed }"
          v-if="authStore.isAuthenticated"
        >
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="text-center text-red-500" />
          <span v-if="!isSidebarCollapsed" class="ml-3 text-red-500">Logout</span>
        </button>
      </nav>
    </aside>

    <!-- Konten Utama -->
    <main
      :class="`${
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      } p-4 transition-all duration-200 ease-in-out`"
    >
      <!-- Konten Anda di sini -->
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

// Import and use auth store
const authStore = useAuthStore()
const router = useRouter()

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

// Fungsi untuk logout
const logout = async () => {
  try {
    await authStore.logout()
    router.push('/signin')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

// Expose state dan fungsi ke parent component
defineExpose({
  isSidebarOpen,
  toggleSidebar,
  isSidebarCollapsed,
  toggleSidebarCollapse,
})
</script>
