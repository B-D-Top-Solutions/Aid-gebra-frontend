<template>
  <h1 class="text-maincolor text-center mb-5">Welcome Admin!</h1>
  <center>
    <div style="max-width: 450px">
      <form class="rounded border p-4" @submit="login">
        <div class="form-floating mb-3">
          <input
            v-model.trim="admin.email"
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            v-model.trim="admin.password"
            type="password"
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
        <span class="text-muted">Don't have an account ?</span> &nbsp; Please
        contact the admin.
      </small>
    </div>
  </center>
</template>

<script setup>
import store from "../../store";
import { useRouter } from "vue-router";

const router = useRouter();

const admin = {
  email: "",
  password: "",
  role: "ADMIN",
};

function login(ev) {
  ev.preventDefault();
  store.dispatch("login", admin).then((data) => {
    if (data.status == true) {
      router.push({ name: "admin-dashboard" });
    } else {
      alert(data.error);
    }
  });
}
</script>
