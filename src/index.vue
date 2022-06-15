<template>
  <div
    class="container d-flex py-5 justify-content-center flex-column align-items-center"
  >
    <img
      class="mb-4 d-block w-100 mx-auto"
      src="/src/assets/images/logo.png"
      style="max-width: 450px"
    />

    <div class="d-grid grid-gap3" style="max-width: 450px; width: 100%">
      <RouterLink
        :to="{ name: 'admin-login' }"
        class="border-hover text-center border border-maincolor text-decoration-none bg-light border-maincolor rounded main-hover p-5 fw-bolder text-maincolor"
      >
        ADMIN
      </RouterLink>
      <RouterLink
        :to="{ name: 'teacher-login' }"
        class="border-hover text-center border border-maincolor text-decoration-none bg-light border-maincolor rounded main-hover p-5 fw-bolder text-maincolor"
      >
        TEACHER
      </RouterLink>
      <RouterLink
        :to="{ name: 'student-login' }"
        class="border-hover text-center border border-maincolor text-decoration-none bg-light border-maincolor rounded main-hover p-5 fw-bolder text-maincolor"
      >
        STUDENT
      </RouterLink>
    </div>
  </div>
</template>
