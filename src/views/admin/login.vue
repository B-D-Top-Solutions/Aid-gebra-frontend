<template>
  <div class="row rounded pt-5">
    <div class="col-md p-5 " style="background-color:#ADEFD1;border-radius: 20px 0 0 20px;">
      <h1 class="mb-3 fw-bolder">Login</h1>
      <p>Good to see you again!</p>
    </div>
    <div class="col-md p-5 bg-light" style="border-radius: 0 20px 20px 0;">
      <h1 class="mb-5">Welcome, Admins!</h1>
      <form class="" @submit="login">
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
        <button class="p-3 d-block w-100 btn bg-main text-white mt-4" type="submit">
          SIGN IN
        </button>
      </form>
      <br />
      <small class="d-flex text-light justify-content-center">
        <span class="text-muted">Don't have an account ?</span> &nbsp; Please
        contact the admin.
      </small>
    </div>
  </div>
 
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
