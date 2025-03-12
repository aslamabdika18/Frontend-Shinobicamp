import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Route untuk halaman home
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },

    // Route untuk halaman login
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SigninView.vue'),
      meta: { noNavbarFooter: true }, // Sembunyikan navbar dan footer
    },

    // Route untuk halaman register
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
      meta: { noNavbarFooter: true }, // Sembunyikan navbar dan footer
    },

    // Route untuk dashboard (hanya bisa diakses jika sudah login)
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard/DashboardView.vue'),
      meta: { requiresAuth: true, allowedRoles: ['admin', 'coach'] }, // Hanya admin dan coach yang bisa mengakses
      children: [
        // Route default untuk dashboard (halaman utama dashboard)
        {
          path: '',
          name: 'dashboard-home',
          component: () => import('@/views/Dashboard/DashboardHome.vue'),
        },

        // Route untuk manajemen events (hanya admin yang bisa mengakses)
        {
          path: 'events',
          name: 'dashboard-events',
          component: () => import('@/views/Dashboard/DashboardEvent.vue'),
          meta: { allowedRoles: ['admin'] }, // Hanya admin yang bisa mengakses
        },

        // Route untuk manajemen teams (admin dan coach bisa mengakses)
        {
          path: 'teams',
          name: 'dashboard-teams',
          component: () => import('@/views/Dashboard/DashboardTeam.vue'),
          meta: { allowedRoles: ['admin', 'coach'] }, // Admin dan coach bisa mengakses
        },

        // Route untuk manajemen coaches (admin dan coach bisa mengakses)
        {
          path: 'coaches',
          name: 'dashboard-coaches',
          component: () => import('@/views/Dashboard/DashboardCoaches.vue'),
          meta: { allowedRoles: ['admin', 'coach'] }, // Admin dan coach bisa mengakses
        },

        // Route untuk manajemen atlet (admin dan coach bisa mengakses)
        {
          path: 'atlets',
          name: 'dashboard-atlets',
          component: () => import('@/views/Dashboard/DashboardAtlet.vue'),
          meta: { allowedRoles: ['admin', 'coach'] }, // Admin dan coach bisa mengakses
        },

        // Route untuk manajemen pembayaran (admin dan coach bisa mengakses)
        {
          path: 'payments',
          name: 'dashboard-payments',
          component: () => import('@/views/Dashboard/DashboardPayment.vue'),
          meta: { allowedRoles: ['admin', 'coach'] }, // Admin dan coach bisa mengakses
        },

        // Route untuk manajemen classcamp (hanya admin yang bisa mengakses)
        {
          path: 'classcamp',
          name: 'dashboard-classcamp',
          component: () => import('@/views/Dashboard/DashboardClasscamp.vue'),
          meta: { allowedRoles: ['admin'] }, // Hanya admin yang bisa mengakses
        },

        // Route untuk manajemen categories (hanya admin yang bisa mengakses)
        {
          path: 'categories',
          name: 'dashboard-categories',
          component: () => import('@/views/Dashboard/DashboardCategories.vue'),
          meta: { allowedRoles: ['admin'] }, // Hanya admin yang bisa mengakses
        },

        // Route untuk manajemen brackets (hanya admin yang bisa mengakses)
        {
          path: 'brackets',
          name: 'dashboard-brackets',
          component: () => import('@/views/Dashboard/DashboardBracket.vue'),
          meta: { allowedRoles: ['admin'] }, // Hanya admin yang bisa mengakses
        },

        // Route untuk manajemen schedules (hanya admin yang bisa mengakses)
        {
          path: 'schedules',
          name: 'dashboard-schedules',
          component: () => import('@/views/Dashboard/DashboardSchedule.vue'),
          meta: { allowedRoles: ['admin'] }, // Hanya admin yang bisa mengakses
        },

        // Route untuk CRUD event (hanya admin yang bisa mengakses)
        {
          path: 'crud-menu/addevent/:eventId?',
          name: 'dashboard-crud-addevent',
          component: () => import('@/views/Dashboard/CRUD-Menu/AddEvent.vue'),
          meta: { allowedRoles: ['admin'] }, // Hanya admin yang bisa mengakses
        },
      ],
    },

    // Route untuk halaman unauthorized (akses ditolak)
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/views/UnauthorizedView.vue'),
    },

    // Route untuk halaman not found (404)
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

// Navigation guard untuk memeriksa autentikasi dan role
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Periksa apakah route memerlukan autentikasi
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/signin') // Redirect ke halaman login jika belum login
    return
  }

  // Periksa apakah pengguna memiliki role yang diizinkan
  if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(authStore.role)) {
    next('/unauthorized') // Redirect ke halaman unauthorized jika role tidak diizinkan
    return
  }

  // Lanjutkan navigasi
  next()
})

export default router
