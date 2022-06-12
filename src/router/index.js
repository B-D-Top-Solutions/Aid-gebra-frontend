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
      component: () => import("../views/student/class.vue"),
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
    {
      path: "/admin/monitoring",
      name: "admin-monitoring-dashboard",
      component: () => import("../views/monitoring/admin/dashboard.vue"),
    },
    {
      path: "/admin/monitoring/class/:id",
      name: "admin-monitoring-class",
      props: true,
      component: () => import("../views/monitoring/admin/class.vue"),
    },
    {
      path: "/admin/monitoring/student/:studentId/class/:classId",
      name: "admin-monitoring-student",
      props: true,
      component: () => import("../views/monitoring/admin/student.vue"),
    },
    {
      path: "/teacher/monitoring",
      name: "teacher-monitoring-dashboard",
      component: () => import("../views/monitoring/teacher/dashboard.vue"),
    },
    {
      path: "/teacher/monitoring/class/:id",
      name: "teacher-monitoring-class",
      props: true,
      component: () => import("../views/monitoring/teacher/class.vue"),
    },
    {
      path: "/teacher/monitoring/student/:studentId/class/:classId",
      name: "teacher-monitoring-student",
      props: true,
      component: () => import("../views/monitoring/teacher/student.vue"),
    },
  ],
});

export default router;
