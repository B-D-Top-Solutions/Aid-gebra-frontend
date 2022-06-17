<template>
  <header class="masthead bg-main text-white text-center">
    <div class="container d-flex align-items-center flex-column">
      <!-- Masthead Avatar Image-->
      <img
        class="masthead-avatar mb-5"
        src="/src/assets/images/logo.png"
        alt="AidGebra logo"
      />
      <!-- Icon Divider-->
      <div class="divider-custom divider-light">
        <div class="divider-custom-line"></div>
        <div class="divider-custom-icon">
          <svg
            class="svg-inline--fa fa-star"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="star"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            data-fa-i2svg=""
          >
            <path
              fill="currentColor"
              d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"
            ></path>
          </svg>
        </div>
        <div class="divider-custom-line"></div>
      </div>
      <!-- Masthead Subheading-->
      <p class="masthead-subheading font-weight-light mb-5">
        AidGebra is an adaptive learning system designed for Filipino Grade 7
        students which takes into account learners' knowledge level to ensure
        mastery of Algebra fundamentals.
      </p>
    </div>
  </header>
  <section class="page-section portfolio mt-5" id="portfolio">
    <div class="container">
      <!-- Portfolio Section Heading-->
      <h2
        class="page-section-heading text-center text-uppercase text-secondary mb-0"
      >
        Login
      </h2>
      <!-- Icon Divider-->
      <div class="divider-custom my-5">
        <div class="divider-custom-line"></div>
      </div>
      <div class="row justify-content-center">
        <div
          class="col-3 mb-5 m-auto border border-maincolor p-5 rounded-circle"
        >
          <div class="portfolio-item mx-auto">
            <RouterLink
              :to="{ name: 'admin-login' }"
              class="text-center text-decoration-none p-5 fw-bolder text-maincolor"
            >
              <h5><i class="bi bi-person-circle"></i> ADMIN</h5>
            </RouterLink>
          </div>
        </div>
        <div
          class="col-3 mb-5 m-auto border border-maincolor p-5 rounded-circle"
        >
          <div class="portfolio-item mx-auto">
            <RouterLink
              :to="{ name: 'teacher-login' }"
              class="text-center text-decoration-none p-5 fw-bolder text-maincolor"
            >
              <h5><i class="bi bi-person-video3"></i> TEACHER</h5>
            </RouterLink>
          </div>
        </div>
        <div
          class="col-3 mb-5 m-auto border border-maincolor p-5 rounded-circle"
        >
          <div class="portfolio-item mx-auto">
            <RouterLink
              :to="{ name: 'student-login' }"
              class="text-center text-decoration-none p-5 fw-bolder text-maincolor"
            >
              <h5><i class="bi bi-person-badge"></i> STUDENT</h5>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="page-section mt-5">
    <div class="container">
      <h2
        class="page-section-heading text-center text-uppercase text-secondary mb-5"
      >
        Contact Us
      </h2>
      <!-- Icon Divider-->
      <div class="divider-custom">
        <div class="divider-custom-line"></div>
      </div>
      <!-- Contact Section Form-->
      <div class="row justify-content-center">
        <div class="col-12">
          <p class="masthead-subheading font-weight-light mb-5 text-center">
            For questions or concerns, you may contact us at
            aidgebra.als@gmail.com
          </p>
        </div>
      </div>
    </div>
  </section>
  <!-- <div
    class="container d-flex py-5 justify-content-center flex-column align-items-center"
  >
    <img
      class="mb-4 d-block w-100 mx-auto"
      src="/src/assets/images/logo.png"
      style="max-width: 650px"
    />
    <div class="row m-5">
      <blockquote class="blockquote">
        <p class="mb-0">
          AidGebra is an adaptive learning system designed for Filipino Grade 7
          students which takes into account learners' knowledge level to ensure
          mastery of Algebra fundamentals.
        </p>
      </blockquote>
    </div>
    <div class="d-flex gap-5" style="">
      
      <RouterLink
        :to="{ name: 'teacher-login' }"
        class="border-hover text-center border border-maincolor text-decoration-none bg-light border-maincolor rounded main-hover p-5 fw-bolder text-maincolor"
        style="width: 200px"
      >
        <h1><i class="bi bi-person-video3"></i></h1>
        TEACHER
      </RouterLink>
      <RouterLink
        :to="{ name: 'student-login' }"
        class="border-hover text-center border border-maincolor text-decoration-none bg-light border-maincolor rounded main-hover p-5 fw-bolder text-maincolor"
        style="width: 200px"
      >
        <h1><i class="bi bi-person-badge"></i></h1>
        STUDENT
      </RouterLink>
    </div>
  </div> -->
</template>
