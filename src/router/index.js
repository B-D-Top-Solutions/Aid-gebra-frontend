import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../index.vue"),
  },

  // Auth
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../components/layouts/authLayout.vue"),
    children: [
      {
        path: "/login/admin",
        name: "admin-login",
        component: () => import("../views/admin/login.vue"),
      },
      {
        path: "/login/teacher",
        name: "teacher-login",
        component: () => import("../views/teacher/login.vue"),
      },
      {
        path: "/login/student",
        name: "student-login",
        component: () => import("../views/student/login.vue"),
      },
      {
        path: "/register/student",
        name: "student-register",
        component: () => import("../views/student/register.vue"),
      },
      {
        path: "/register/teacher",
        name: "teacher-register",
        component: () => import("../views/teacher/register.vue"),
      },
    ],
  },

  {
    path: "/admin",
    redirect: "/admin/dashboard",
    name: "Admin",
    component: () => import("../components/layouts/adminLayout.vue"),
    children: [
      {
        path: "/admin/dashboard",
        name: "admin-dashboard",
        meta: { requiresAuth: true, adminOnly: true },
        component: () => import("../views/admin/dashboard.vue"),
      },
    ],
  },
  // {
  //   path: "/login/student",
  //   name: "student-index",
  //   component: () => import("../views/student/index.vue"),
  // },
  // {
  //   path: "/teacher",
  //   name: "teacher-index",
  //   component: () => import("../views/teacher/index.vue"),
  // },

  // Admin Dash

  // {
  //   path: "/admin/class/:class?",
  //   name: "admin-class",
  //   meta: { requiresAuth: true },
  //   component: () => import("../views/admin/class.vue"),
  // },
  // {
  //   path: "/admin/profile",
  //   name: "admin-profile",
  //   meta: { requiresAuth: true },
  //   component: () => import("../views/admin/profile.vue"),
  // },
  // {
  //   path: "/admin/users",
  //   name: "admin-users",
  //   meta: { requiresAuth: true },
  //   component: () => import("../views/admin/users.vue"),
  // },
  // {
  //   path: "/admin/teachers",
  //   name: "admin-teachers",
  //   meta: { requiresAuth: true },
  //   component: () => import("../views/admin/teachers.vue"),
  // },

  // {
  //   path: "/student/dashboard",
  //   name: "student-dashboard",
  //   component: () => import("../views/student/dashboard.vue"),
  // },
  // {
  //   path: "/student/profile",
  //   name: "student-profile",
  //   component: () => import("../views/student/profile.vue"),
  // },
  // {
  //   path: "/student/classroom/:id/:lesson?/:concept?",
  //   name: "student-class",
  //   component: () => import("../views/student/class.vue"),
  // },

  // {
  //   path: "/teacher/dashboard",
  //   name: "teacher-dashboard",
  //   component: () => import("../views/teacher/dashboard.vue"),
  // },
  // {
  //   path: "/teacher/profile",
  //   name: "teacher-profile",
  //   component: () => import("../views/teacher/profile.vue"),
  // },
  // {
  //   path: "/teacher/classes",
  //   name: "teacher-classes",
  //   component: () => import("../views/teacher/classes.vue"),
  // },
  // {
  //   path: "/teacher/students/:classId/:classCode",
  //   name: "teacher-students",
  //   props: true,
  //   component: () => import("../views/teacher/students.vue"),
  // },
  // {
  //   path: "/admin/monitoring",
  //   name: "admin-monitoring-dashboard",
  //   component: () => import("../views/monitoring/admin/dashboard.vue"),
  // },
  // {
  //   path: "/admin/monitoring/class/:id",
  //   name: "admin-monitoring-class",
  //   props: true,
  //   component: () => import("../views/monitoring/admin/class.vue"),
  // },
  // {
  //   path: "/admin/monitoring/student/:studentId/class/:classId",
  //   name: "admin-monitoring-student",
  //   props: true,
  //   component: () => import("../views/monitoring/admin/student.vue"),
  // },
  // {
  //   path: "/teacher/monitoring",
  //   name: "teacher-monitoring-dashboard",
  //   component: () => import("../views/monitoring/teacher/dashboard.vue"),
  // },
  // {
  //   path: "/teacher/monitoring/class/:id",
  //   name: "teacher-monitoring-class",
  //   props: true,
  //   component: () => import("../views/monitoring/teacher/class.vue"),
  // },
  // {
  //   path: "/teacher/monitoring/student/:studentId/class/:classId",
  //   name: "teacher-monitoring-student",
  //   props: true,
  //   component: () => import("../views/monitoring/teacher/student.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next("/");
  } else if (
    store.state.user.token &&
    (to.name === "index" || to.name === "admin-index")
  ) {
    next({ name: "admin-dashboard" });
  } else {
    next();
  }
});

export default router;
