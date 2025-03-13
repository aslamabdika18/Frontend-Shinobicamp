import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons' // Impor semua ikon Solid sekaligus
import { far } from '@fortawesome/free-regular-svg-icons' // Ikon Regular

// Tambahkan semua ikon Solid dan Regular ke library
library.add(fas, far)

// Buat instance aplikasi Vue
const app = createApp(App)

// Buat instance Pinia
const pinia = createPinia()

// Register Pinia ke aplikasi Vue
app.use(pinia)

// Inisialisasi auth store
import { useAuthStore } from '@/stores/authStore' // Import auth store
const authStore = useAuthStore() // Buat instance auth store
authStore.initializeAuth() // Inisialisasi auth store

// Register komponen FontAwesomeIcon secara global
app.component('font-awesome-icon', FontAwesomeIcon)

// Register router ke aplikasi Vue
app.use(router)

// Mount aplikasi Vue ke elemen dengan id "app"
app.mount('#app')
