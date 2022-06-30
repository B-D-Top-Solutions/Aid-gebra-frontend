import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  // Index
  {
    path: "/",
    name: "index",
    component: () => import("../index.vue"),
  },
  {
    path : "/login",
    name : "public_login",
    component : () => import("../views/login.vue")
  }, 
  {
    path : "/register",
    name : "public_register",
    component : () => import("../views/signup.vue")
  }, 
  {
    path : "/about",
    name : "public_about",
    component : () => import("../views/about.vue")
  }, 
  {
    path : "/verify/email",
    name : "public_verifyemail",
    component : () => import("../views/emailverify.vue")
  }, 
  {
    path : "/forgotpassword/change",
    name : "public_changepassword",
    component : () => import("../views/forgotpassword.vue")
  }, 
  // Auth
  {
    path: "/auth",
    name: "auth",
    component: () => import("../components/layouts/authLayout.vue"),
    beforeEnter(to, from, next) {
      if (store.state.user.token != null) {
        switch (store.state.user.role) {
          case "ADMIN":
            next({ name: "admin-dashboard" });
            break;
          case "TEACHER":
            next({ name: "teacher-dashboard" });
            break;
          case "STUDENT":
            next({ name: "student-dashboard" });
            break;
          default:
            next({ name: "index" });
            break;
        }
      } else {
        next();
      }
    },
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

  // Monitor Routes
  {
    path: "/monitor",
    name: "monitor",
    component: () => import("../components/layouts/monitoringLayout.vue"),
    children: [
      {
        path: "/monitor/students",
        name: "monitor-students",
        component: () => import("../views/monitoring/monitor/allStudents.vue"),
      },
      {
        path: "/monitor/tests/:studentId/:type",
        name: "monitor-tests",
        props: true,
        component: () => import("../views/monitoring/monitor/allTest.vue"),
      },
      {
        path: "/monitor/tests/pretest/:pretestId",
        name: "monitor-pretest",
        props: true,
        component: () => import("../views/monitoring/monitor/viewPretest.vue"),
      },
      {
        path: "/monitor/tests/posttest/:posttestId",
        name: "monitor-posttest",
        props: true,
        component: () => import("../views/monitoring/monitor/viewPosttest.vue"),
      },
      {
        path: "/monitor/student-progress/:studentId",
        name: "monitor-progress",
        props: true,
        component: () =>
          import("../views/monitoring/monitor/studentProgress.vue"),
      },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: () => import("../components/layouts/adminLayout.vue"),
    beforeEnter(to, from, next) {
      if (store.state.user.token != null) {
        if (store.state.user.role == "ADMIN") {
          next();
        } else {
          next({ name: "index" });
        }
      } else {
        next({ name: "index" });
      }
    },
    children: [
      {
        path: "/admin/monitoring",
        name: "admin-monitoring-test",
        component: () => import("../views/monitoring/admin/test.vue"),
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
        path: "/admin/users/admin",
        name: "admin-users",
        component: () => import("../views/admin/adminUsers.vue"),
      },
      {
        path: "/admin/users/teachers",
        name: "admin-teachers",
        component: () => import("../views/admin/teacherUsers.vue"),
      },
      {
        path: "/admin/users/students",
        name: "admin-students",
        component: () => import("../views/admin/studentUsers.vue"),
      },
      {
        path: "/admin/classes",
        name: "admin-classes",
        component: () => import("../views/admin/classes.vue"),
      },
      {
        path: "/admin/lessons",
        name: "admin-lessons",
        component: () => import("../views/admin/lessons.vue"),
      },
      {
        path: "/admin/lessons/:lessonId",
        name: "admin-lessons-view",
        props: true,
        component: () => import("../views/admin/lessonView.vue"),
      },
      {
        path: "/admin/concepts/:conceptId",
        name: "admin-concepts-view",
        props: true,
        component: () => import("../views/admin/conceptView.vue"),
      },
      {
        path: "/admin/lectures/:conceptId/:setType",
        name: "admin-lecture-view",
        props: true,
        component: () => import("../views/admin/lectureView.vue"),
      },
      {
        path: "/admin/pretests/:lessonId",
        name: "admin-pretest-view",
        props: true,
        component: () => import("../views/admin/pretestView.vue"),
      },
      {
        path: "/admin/posttest/:lessonId",
        name: "admin-posttest-view",
        props: true,
        component: () => import("../views/admin/posttestView.vue"),
      },
      {
        path: "/admin/announcements",
        name: "admin-announcements",
        component: () => import("../views/admin/announcement.vue"),
      },
      {
        path: "/admin/allstudents",
        name: "admin-allstudents",
        component: () => import("../views/admin/monitorAll.vue"),
      },
    ],
  },
  // Teacher Routes
  {
    path: "/teacher",
    redirect: "/teacher/dashboard",
    name: "Admin",
    component: () => import("../components/layouts/teacherLayout.vue"),
    beforeEnter(to, from, next) {
      if (store.state.user.token != null) {
        if (store.state.user.role == "TEACHER") {
          next();
        } else {
          next({ name: "index" });
        }
      } else {
        next({ name: "index" });
      }
    },
    children: [
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
        path: "/teacher/classes/:classId",
        name: "teacher-class-view",
        props: true,
        component: () => import("../views/teacher/myClass.vue"),
      },
      {
        path: "/teacher/mystudents",
        name: "teacher-mystudents",
        component: () => import("../views/teacher/myStudents.vue"),
      },
    ],
  },
  // Student Routes
  {
    path: "/student",
    redirect: "/student/dashboard",
    name: "Student",
    component: () => import("../components/layouts/studentLayout.vue"),
    beforeEnter(to, from, next) {
      if (store.state.user.token != null) {
        if (store.state.user.role == "STUDENT") {
          next();
        } else {
          next({ name: "index" });
        }
      } else {
        next({ name: "index" });
      }
    },
    children: [
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
        path: "/student/lesson/:lessonId",
        name: "student-lesson-view",
        props: true,
        component: () => import("../views/student/classView.vue"),
      },
      {
        path: "/student/lecture/:lessonId/:conceptId",
        name: "student-lecture-view",
        props: true,
        component: () => import("../views/student/lectureView.vue"),
      },
      {
        path: "/student/prettest/:lessonId",
        name: "student-pretest-view",
        props: true,
        component: () => import("../views/student/pretestView.vue"),
      },
      {
        path: "/student/posttest/:lessonId",
        name: "student-posttest-view",
        props: true,
        component: () => import("../views/student/posttestView.vue"),
      },
      {
        path: "/student/myclass",
        name: "student-myclass",
        component: () => import("../views/student/myClass.vue"),
      },
      {
        path: "/student/assesment/:lessonId/:conceptId",
        name: "student-assesment-view",
        props: true,
        component: () => import("../views/student/assesment.vue"),
      },
      {
        path: "/student/myprogress",
        name: "student-myprogress",
        component: () => import("../views/student/progress.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !store.state.user.token) {
//     next({ name: "index" });
//   } else if (store.state.user.token && to.meta.isGuest) {
//     next({ name: "admin-dashboard" });
//   } else {
//     next();
//   }
// });

export default router;
// console.log(store.state.user.data.role);
// switch (store.state.user.data.role) {
//   case "ADMIN":
//     next({ name: "admin-dashboard" });
//     break;
//   case "TEACHER":
//     next({ name: "teacher-dashboard" });
//     break;
//   case "STUDENT":
//     next({ name: "student-dashboard" });
//     break;
//   default:
//     next({ name: "index" });
//     break;
// }
