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
      <h1 class="mb-3 fw-bolder" style="font-size:4em">Sign up</h1><br/><br/>
      <h1 class="mb-5">WELCOME TO AIDGEBRA!</h1>
      <p>AidGebra is an adaptive learning system designed for Filipino Grade 7 students which takes into account learners' knowledge level to ensure mastery of Algebra fundamentals.
              <br/><br/>
      Enhance your algebra skills and monitor your progress!</p>
    </div>
    <div class="col-md p-5 bg-light" style="border-radius: 0 20px 20px 0;">
    <h1 class="mb-5">Sign up as</h1>

    <RouterLink to="/register/student" class="p-3 d-block w-100 btn bg-main text-white mt-4">
        Student
    </RouterLink>
    <RouterLink to="/register/teacher" class="p-3 d-block w-100 btn bg-main text-white mt-4">
        Teacher
    </RouterLink>
      <br />
      <small class="d-flex justify-content-center">
        <span class="text-muted">Already have an account ?</span> &nbsp;
        <RouterLink
          to="/login"
          class="text-decoration-none text-maincolor"
        >
          Login in  here
        </RouterLink>
      </small>
    </div>
  </div>
</div>

</template>