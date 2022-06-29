<template>

<div class="w-100 bg-light p-3 mb-4">
    <div class="d-flex justify-content-between align-items-center">
        <span>
        <RouterLink to="/login" class="text-decoration-none fw-bolder text-dark me-3">Login</RouterLink>
        <RouterLink to="/register" class="text-decoration-none fw-bolder text-dark">Sign up</RouterLink>
        </span>
        <span>
        <img
            class="d-block w-100 mx-auto"
            src="/src/assets/images/logo.png"
            style="max-width: 200px"
        />
        </span>
        <span>
        <RouterLink to="/lessons" class="text-decoration-none fw-bolder text-dark me-3">Lessons</RouterLink>
        <RouterLink to="/about" class="text-decoration-none fw-bolder text-dark">About Us</RouterLink>
        </span>
    </div>
</div>

<div class="container">
  <div class="row rounded pt-5">
    <div class="col-md p-5 " style="background-color:#ADEFD1;border-radius: 20px 0 0 20px;">
      <h1 class="mb-3 fw-bolder">Login</h1>
      <p>Good to see you again!</p>
    </div>
    <div class="col-md p-5 bg-light" style="border-radius: 0 20px 20px 0;">
    <h1 class="mb-5">Log in as</h1>

    <RouterLink to="/login/student" class="p-3 d-block w-100 btn bg-main text-white mt-4">
        Student
    </RouterLink>
    <RouterLink to="/login/teacher" class="p-3 d-block w-100 btn bg-main text-white mt-4">
        Teacher
    </RouterLink>
      <br />
      <small class="d-flex justify-content-center">
        <span class="text-muted">Don't have an account ?</span> &nbsp;
        <RouterLink
          to="/register"
          class="text-decoration-none text-maincolor"
        >
          Register here
        </RouterLink>
      </small>
    </div>
  </div>
</div>

</template>