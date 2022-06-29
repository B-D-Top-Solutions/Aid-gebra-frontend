<template>
  <div class="row rounded pt-5">
    <div class="col-md p-5 " style="background-color:#ADEFD1;border-radius: 20px 0 0 20px;">
      <h1 class="mb-3 fw-bolder" style="font-size:4em">Sign up</h1><br/><br/>
      <h1 class="mb-5">HELLO STUDENTS</h1>
      <p>AidGebra is an adaptive learning system designed for Filipino Grade 7 students which takes into account learners' knowledge level to ensure mastery of Algebra fundamentals.
              <br/><br/>
      Enhance your algebra skills and monitor your progress!</p>
    </div>
    <div class="col-md p-5 bg-light" style="border-radius: 0 20px 20px 0;">
      <form @submit="register">
        <div class="form-floating mb-3">
          <input type="email" v-model.trim="student.email" class="form-control" placeholder="name@example.com"
            id="floating-email" required />
          <label for="floating-email">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" v-model.trim="student.fullname" class="form-control" placeholder="Fullname"
            id="floating-fullname" />
          <label for="floating-fullname">Username</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" v-model.trim="student.firstname" class="form-control" placeholder="First Name"
            id="floating-firstname" />
          <label for="floating-firstname">First Name</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" v-model.trim="student.middlename" class="form-control" placeholder="Middle Name"
            id="floating-middlename" />
          <label for="floating-middlename">Middle Name(Optional)</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" v-model.trim="student.lastname" class="form-control" placeholder="Last Name"
            id="floating-lastname" />
          <label for="floating-lastname">Last Name</label>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">09</span>
          <input type="text" v-model.trim="student.contact" class="form-control" placeholder="Contact Number" />
        </div>
        <div class="form-floating mb-3">
          <input type="password" v-model.trim="student.password" class="form-control" placeholder="passsowrd"
            id="floating-password" />
          <label for="floating-password">Password</label>
        </div>
        <div class="form-floating">
          <input type="password" v-model.trim="student.confirm_password" class="form-control"
            placeholder="Confirm Password" id="floating-confirm" />
          <label for="floating-confirm">Confirm Password</label>
        </div>
        <button type="submit" class="d-block w-100 btn bg-main text-white mt-4 p-3">
          REGISTER
        </button>
      </form>
      <br />
      <small class="d-flex justify-content-center">
        <span class="text-muted">Already have an account ?</span> &nbsp;
        <RouterLink :to="{ name: 'student-login' }" class="text-decoration-none text-maincolor">
          Sign in here.
        </RouterLink>
      </small>
    </div>
  </div>
</template>

<script setup>
import store from "../../store";
import { useRouter } from "vue-router";

const router = useRouter();

const student = {
  email: "",
  fullname: "",
  firstname: "",
  middlename: "",
  lastname: "",
  contact: "",
  password: "",
  confirm_password: "",
  role: "STUDENT",
};

function register(ev) {
  ev.preventDefault();

  store.dispatch("register", student).then((data) => {
    if (data.status == true) {
      router.push({ name: "student-dashboard" });
    } else {
      alert(data.error);
    }
  });
}
</script>
