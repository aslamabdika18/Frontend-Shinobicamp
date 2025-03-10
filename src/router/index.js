import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/EventView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SigninView.vue'),
      meta: { noNavbarFooter: true }, // Tambahkan meta field untuk Sign In
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
      meta: { noNavbarFooter: true }, // Tambahkan meta field untuk Sign Up
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../Dashboard/DashboardView.vue'),
      meta: { noNavbarFooter: true }, // Tambahkan meta field untuk Dashboard
      children: [
        {
          path: '', // Default route untuk /dashboard
          component: () => import('../Dashboard/DashboardHome.vue'),
        },
        {
          path: 'events', // URL: /dashboard/events
          name: 'dashboard-events',
          component: () => import('../Dashboard/DashboardEvent.vue'),
        },
        {
          path: '/dashboard/crud-menu/addevent/:eventId?',
          component: () => import('@/Dashboard/CRUD-Menu/AddEvent.vue'),
        },
        {
          path: 'teams', // URL: /dashboard/teams
          name: 'dashboard-teams',
          component: () => import('../Dashboard/DashboardTeam.vue'),
        },
        {
          path: 'coaches', // URL: /dashboard/coaches
          name: 'dashboard-coaches',
          component: () => import('../Dashboard/DashboardCoaches.vue'),
        },
        {
          path: 'classcamp', // URL: /dashboard/classcamp
          name: 'dashboard-classcamp',
          component: () => import('../Dashboard/DashboardClasscamp.vue'),
        },
        {
          path: 'categories', // URL: /dashboard/categories
          name: 'dashboard-categories',
          component: () => import('../Dashboard/DashboardCategories.vue'),
        },
        {
          path: 'brackets', // URL: /dashboard/brackets
          name: 'dashboard-brackets',
          component: () => import('../Dashboard/DashboardBracket.vue'),
        },
        {
          path: 'schedules', // URL: /dashboard/schedules
          name: 'dashboard-schedules',
          component: () => import('../Dashboard/DashboardSchedule.vue'),
        },
        {
          path: 'payments', // URL: /dashboard/payments
          name: 'dashboard-payments',
          component: () => import('../Dashboard/DashboardPayment.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*', // Tangani semua route yang tidak terdaftar
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
