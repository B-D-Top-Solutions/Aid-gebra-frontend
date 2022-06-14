<template>
  <h1 class="text-maincolor text-center mb-5">Welcome students!</h1>
  <center>
    <div style="max-width: 450px">
      <form class="rounded border p-4" @submit="register">
        <div class="form-floating mb-3">
          <input
            type="email"
            v-model.trim="student.email"
            class="form-control"
            placeholder="name@example.com"
            id="floating-email"
          />
          <label for="floating-email">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            v-model.trim="student.fullname"
            class="form-control"
            placeholder="Fullname"
            id="floating-fullname"
          />
          <label for="floating-fullname">Fullname</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            v-model.trim="student.contact"
            class="form-control"
            placeholder="Contact Number"
            id="floating-contact"
          />
          <label for="floating-contact">Contact Number</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            v-model.trim="student.password"
            class="form-control"
            placeholder="passsowrd"
            id="floating-password"
          />
          <label for="floating-password">Password</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            v-model.trim="student.confirm_password"
            class="form-control"
            placeholder="Confirm Password"
            id="floating-confirm"
          />
          <label for="floating-confirm">Confirm Password</label>
        </div>
        <button type="submit" class="d-block w-100 btn bg-main text-white mt-4">
          REGISTER
        </button>
      </form>
      <br />
      <small class="d-flex">
        <span class="text-muted">Already have an account ?</span> &nbsp;
        <RouterLink
          :to="{ name: 'student-login' }"
          class="text-decoration-none text-maincolor"
        >
          Sign in here.
        </RouterLink>
      </small>
    </div>
  </center>
</template>

<script setup>
import store from "../../store";
import { useRouter } from "vue-router";

const router = useRouter();

const student = {
  email: "",
  fullname: "",
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
