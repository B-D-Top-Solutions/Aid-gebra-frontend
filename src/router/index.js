import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../index.vue"),
    },
    {
      path: "/student",
      name: "student-index",
      component: () => import("../views/student/index.vue"),
    },
    {
      path: "/student/register",
      name: "student-register",
      component: () => import("../views/student/register.vue"),
    },
    {
      path: "/student/dashboard",
      name: "student-dashboard",
      component: () => import("../views/student/dashboard.vue"),
    },
    {
      path: "/student/profile",
      name: "student-profile",
      component: () => import("../views/student/profile.vue"),
    },
    {
      path: "/student/classroom/:id/:lesson?/:concept?",
      name: "student-class",
      component: () => import("../views/student/class.vue")
    },
    {
      path: "/admin",
      name: "admin-index",
      component: () => import("../views/admin/index.vue"),
    },
    {
      path: "/admin/dashboard",
      name: "admin-dashboard",
      component: () => import("../views/admin/dashboard.vue"),
    },
    {
      path: "/admin/profile",
      name: "admin-profile",
      component: () => import("../views/admin/profile.vue"),
    },
    {
      path: "/admin/users",
      name: "admin-users",
      component: () => import("../views/admin/users.vue"),
    },
    {
      path: "/admin/teachers",
      name: "admin-teachers",
      component: () => import("../views/admin/teachers.vue"),
    },
    {
      path: "/teacher",
      name: "teacher-index",
      component: () => import("../views/teacher/index.vue"),
    },
    {
      path: "/teacher/register",
      name: "teacher-register",
      component: () => import("../views/teacher/register.vue"),
    },
    {
      path: "/teacher/dashboard",
      name: "teacher-dashboard",
      component: () => import("../views/teacher/dashboard.vue"),
    },
    {
      path: "/teacher/profile",
      name: "teacher-profile",
      component: () => import("../views/teacher/profile.vue"),
    },
    {
      path: "/teacher/classes",
      name: "teacher-classes",
      component: () => import("../views/teacher/classes.vue"),
    },
  ],
});

export default router;
