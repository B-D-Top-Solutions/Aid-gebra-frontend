<template>
  <div class="row rounded pt-5">
    <div
      class="col-md p-5"
      style="background-color: #adefd1; border-radius: 20px 0 0 20px"
    >
      <h1 class="mb-3 fw-bolder" style="font-size: 4em">Sign up</h1>
      <br /><br />
      <h1 class="mb-5">HELLO TEACHERS</h1>
      <p>
        Help your students enhance their algebra skills and monitor their
        progress!
      </p>
    </div>
    <div class="col-md p-5 bg-light" style="border-radius: 0 20px 20px 0">
      <form @submit="register">
        <div class="form-floating mb-3">
          <input
            type="email"
            v-model.trim="teacher.email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            v-model.trim="teacher.fullname"
            class="form-control"
            id="floatingInput1"
            placeholder="Fullname"
          />
          <label for="floatingInput1">Username</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            v-model.trim="teacher.firstname"
            class="form-control"
            placeholder="First Name"
            id="floating-firstname"
          />
          <label for="floating-firstname">First Name</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            v-model.trim="teacher.middlename"
            class="form-control"
            placeholder="Middle Name"
            id="floating-middlename"
          />
          <label for="floating-middlename">Middle Name(Optional)</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            v-model.trim="teacher.lastname"
            class="form-control"
            placeholder="Last Name"
            id="floating-lastname"
          />
          <label for="floating-lastname">Last Name</label>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">09</span>
          <input
            type="text"
            v-model.trim="teacher.contact"
            class="form-control"
            placeholder="Contact Number"
          />
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            v-model.trim="teacher.password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            v-model.trim="teacher.confirm_password"
            class="form-control"
            id="floatingPassword1"
            placeholder="Confirm Password"
          />
          <label for="floatingPassword1">Confirm Password</label>
        </div>
        <button
          type="submit"
          class="p-3 d-block w-100 btn bg-main text-white mt-4"
        >
          REGISTER
        </button>
      </form>
      <br />
      <small class="d-flex justify-content-center">
        <span class="text-muted">Already have an account ?</span> &nbsp;
        <RouterLink
          :to="{ name: 'teacher-login' }"
          class="text-decoration-none text-maincolor"
        >
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

const teacher = {
  email: "",
  fullname: "",
  firstname: "",
  middlename: "",
  lastname: "",
  contact: "",
  password: "",
  confirm_password: "",
  role: "TEACHER",
};

function register(ev) {
  ev.preventDefault();
  store.dispatch("register", teacher).then((data) => {
    console.log(data);
    if (data.status == true) {
      alert(
        "Registered successfully, Please verify your email that is sent to your email."
      );
      router.push({ name: "teacher-dashboard" });
    } else {
      console.log(data.error);

      alert(data?.error || JSON.stringify(data.error.message));
    }
  });
}
</script>
