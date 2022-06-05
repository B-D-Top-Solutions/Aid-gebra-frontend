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
    },
    {
      path : '/admin',
      name : 'admin-index',
      component : () => import('../views/admin/index.vue')
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/admin/dashboard.vue')
    },
    {
      path: '/admin/profile',
      name: 'admin-profile',
      component: () => import('../views/admin/profile.vue')
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('../views/admin/users.vue')
    },
  ]
})

export default router
