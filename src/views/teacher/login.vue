<template>
  <h1 class="text-maincolor text-center mb-5">Welcome Teacher!</h1>
  <center>
    <div style="max-width: 450px">
      <form class="rounded border p-4" @submit="login">
        <div class="form-floating mb-13">
          <input
            type="email"
            v-model.trim="teacher.email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            v-model.trim="teacher.password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button class="d-block w-100 btn bg-main text-white mt-4" type="submit">
          SIGN IN
        </button>
      </form>
      <br />
      <small class="d-flex">
        <span class="text-muted">Don't have an account ? </span> &nbsp;
        <RouterLink
          :to="{ name: 'teacher-register' }"
          class="text-decoration-none text-maincolor"
        >
          Register here.
        </RouterLink>
      </small>
    </div>
  </center>
</template>

<script setup>
import store from "../../store";
import { useRouter } from "vue-router";

const router = useRouter();

const teacher = {
  email: "",
  password: "",
  role: "TEACHER",
};

function login(ev) {
  ev.preventDefault();
  store.dispatch("login", teacher).then((data) => {
    if (data.status == true) {
      router.push({ name: "teacher-dashboard" });
    } else {
      alert(data.error);
    }
  });
}
</script>
