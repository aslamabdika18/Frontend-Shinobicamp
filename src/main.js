import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { useAuthStore } from '@/stores/authStore'

// Add all icons to library
library.add(fas, far)

// Create Vue app
const app = createApp(App)

// Create and use Pinia
const pinia = createPinia()
app.use(pinia)

// Register FontAwesomeIcon globally
app.component('font-awesome-icon', FontAwesomeIcon)

// Initialize auth store before mounting app
const authStore = useAuthStore()

// Using an immediately invoked async function
;(async () => {
  // Initialize auth store
  await authStore.initialize()

  // Register router after auth is initialized
  app.use(router)

  // Mount app
  app.mount('#app')
})()
