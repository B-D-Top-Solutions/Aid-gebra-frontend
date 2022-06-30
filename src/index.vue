<template>
  <div class="w-100 bg-light p-3 mb-4">
    <div class="d-flex justify-content-between align-items-center">
      <span>
        <RouterLink
          to="/login"
          class="text-decoration-none fw-bolder text-dark me-3"
          >Login</RouterLink
        >
        <RouterLink
          to="/register"
          class="text-decoration-none fw-bolder text-dark"
          >Sign up</RouterLink
        >
      </span>
      <span>
        <img
          class="d-block w-100 mx-auto"
          src="/src/assets/images/logo.png"
          style="max-width: 200px"
        />
      </span>
      <span>
        <RouterLink
          to="/lessons"
          class="text-decoration-none fw-bolder text-dark me-3"
          >Lessons</RouterLink
        >
        <RouterLink to="/about" class="text-decoration-none fw-bolder text-dark"
          >About Us</RouterLink
        >
      </span>
    </div>
  </div>

  <div class="container mt-5">
    <div class="row mt-5 pt-3">
    <div class="col-md-6">
    <img src="/src/assets/images/homepage.png" class="w-100 d-block" />
    </div>
    
    <section class="col-md-6 pt-5 text-light">
      <h1 style="font-size: 3em">Enhance your Algebra Skills</h1>
      <p style="font-size: 1.5em; margin-top: 15px">
        Learn Grade 7 Algebra anytime and anywhere
      </p>

      <RouterLink
        :to="{ name: 'teacher-login' }"
        class="btn text-decoration-none me-3 fw-bolder text-maincolor px-5 py-3 mb-2"
        style="background-color: aquamarine"
      >
        TEACHER
      </RouterLink>
      <RouterLink
        :to="{ name: 'student-login' }"
        class="btn text-decoration-none me-3 fw-bolder text-maincolor px-5 py-3 mb-2"
        style="background-color: aquamarine"
      >
        STUDENT
      </RouterLink>
    </section>
    </div>
  </div>
</template>
