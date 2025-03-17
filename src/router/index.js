import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home route
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },

    // Auth routes
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SigninView.vue'),
      meta: { noNavbarFooter: true, guestOnly: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
      meta: { noNavbarFooter: true, guestOnly: true },
    },

    // Dashboard routes
    {
      path: '/dashboard',
      component: () => import('@/views/Dashboard/DashboardView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard-home',
          component: () => import('@/views/Dashboard/DashboardHome.vue'),
          meta: { requiresAuth: true, allowedRoles: ['admin', 'coach'] },
        },
        {
          path: 'events',
          name: 'dashboard-events',
          component: () => import('@/views/Dashboard/DashboardEvent.vue'),
          meta: { requiresAuth: true, allowedRoles: ['admin'] },
        },
        {
          path: 'teams',
          name: 'dashboard-teams',
          component: () => import('@/views/Dashboard/DashboardTeam.vue'),
          meta: { requiresAuth: true, allowedRoles: ['admin', 'coach'] },
        },
        {
          path: 'coaches',
          name: 'dashboard-coaches',
          component: () => import('@/views/Dashboard/DashboardCoaches.vue'),
          meta: { requiresAuth: true, allowedRoles: ['admin', 'coach'] },
        },
        {
          path: 'atlets',
          name: 'dashboard-atlets',
          component: () => import('@/views/Dashboard/DashboardAtlet.vue'),
          meta: { requiresAuth: true, allowedRoles: ['admin', 'coach'] },
        },
        {
          path: 'payments',
          name: 'dashboard-payments',
          component: () => import('@/views/Dashboard/DashboardPayment.vue'),
          meta: { requiresAuth: true, allowedRoles: ['admin', 'coach'] },
        },
        {
          path: 'classcamp',
          name: 'dashboard-classcamp',
          component: () => import('@/views/Dashboard/DashboardClasscamp.vue'),
          meta: { requiresAuth: true, allowedRoles: ['admin'] },
        },
        {
          path: 'categories',
          name: 'dashboard-categories',
          component: () => import('@/views/Dashboard/DashboardCategories.vue'),
          meta: { requiresAuth: true, allowedRoles: ['admin'] },
        },
        {
          path: 'brackets',
          name: 'dashboard-brackets',
          component: () => import('@/views/Dashboard/DashboardBracket.vue'),
          meta: { requiresAuth: true, allowedRoles: ['admin'] },
        },
        {
          path: 'schedules',
          name: 'dashboard-schedules',
          component: () => import('@/views/Dashboard/DashboardSchedule.vue'),
          meta: { requiresAuth: true, allowedRoles: ['admin'] },
        },
        {
          path: 'crud-menu/addevent/:eventId?',
          name: 'dashboard-crud-addevent',
          component: () => import('@/views/Dashboard/CRUD-Menu/AddEvent.vue'),
          meta: { requiresAuth: true, allowedRoles: ['admin'] },
        },
      ],
    },

    // Error routes
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/views/UnauthorizedView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Wait for auth store to be initialized if it's not already
  if (!authStore.initialized) {
    await authStore.initialize()
  }

  // Redirect authenticated users away from guest-only routes
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next('/dashboard')
  }

  // Redirect unauthenticated users from protected routes
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/signin')
  }

  // Check role-based access
  if (to.meta.allowedRoles && authStore.isAuthenticated) {
    const hasAllowedRole = authStore.roles.some((role) => to.meta.allowedRoles.includes(role))

    if (!hasAllowedRole) {
      return next('/unauthorized')
    }
  }

  next()
})

export default router
