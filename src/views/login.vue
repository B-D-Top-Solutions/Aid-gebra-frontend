<template>

<div class="w-100 bg-light p-3 mb-4">
    <div class="d-flex justify-content-between align-items-center">
        <span>
        <RouterLink to="/login" class="text-decoration-none fw-bolder text-dark me-3">Login</RouterLink>
        <RouterLink to="/register" class="text-decoration-none fw-bolder text-dark">Sign up</RouterLink>
        </span>
        <span>
        <img

          v-if="desktop.show"
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
  <br/>
      <small class="mt-5 pt-5 d-flex justify-content-end">
          <span class="text-muted">Login as</span> &nbsp;
          <RouterLink
            to="/login/admin"
            class="text-decoration-none text-maincolor"
          >
            admin here
          </RouterLink>
      </small>
    </div>
  </div>
</div>

</template>

<script>
export default {
    name : 'index',
    data(){
        return {
            desktop : {
              show : true
            }
        }
    },
    methods :{
        r (condition) {
            console.log(condition)
            if(condition == true){
              this.desktop.show = false 
            }
            else{
              this.desktop.show = true
            }
        }
    },
    created() {

        this.r(window.matchMedia('(max-width: 600px)').matches)

        window.addEventListener('resize',(e) => {
            this.r(window.innerWidth <= 600)
        })
    }
}
</script>