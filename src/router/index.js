import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/student',
      name: 'student-index',
      component: () => import('../views/student/index.vue')
    },
    {
      path: '/student/register',
      name: 'student-register',
      component: () => import('../views/student/register.vue')
    },
    {
      path: '/student/dashboard',
      name: 'student-dashboard',
      component: () => import('../views/student/dashboard.vue')
    },
    {
      path: '/student/profile',
      name: 'student-profile',
      component: () => import('../views/student/profile.vue')
    }
  ]
})

export default router
