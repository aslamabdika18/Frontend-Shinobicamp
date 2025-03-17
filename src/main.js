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
  console.log('App initialization started')

  // Initialize auth store
  try {
    console.log('Starting auth store initialization')
    const result = await authStore.initialize()
    console.log('Auth store initialization complete, authenticated:', result)
  } catch (err) {
    console.error('Auth store initialization error:', err)
  }

  // Register router after auth is initialized
  app.use(router)

  // Mount app
  app.mount('#app')
  console.log('App mounted')
})()
