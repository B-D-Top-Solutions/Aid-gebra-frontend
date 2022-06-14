<template>
  <h1 class="text-maincolor text-center mb-5">Welcome teacher!</h1>
  <center>
    <div style="max-width: 450px">
      <div class="rounded border p-4">
        <div class="form-floating mb-3">
          <input
            type="email"
            v-model.trim="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            v-model.trim="fullname"
            class="form-control"
            id="floatingInput1"
            placeholder="Fullname"
          />
          <label for="floatingInput1">Fullname</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            v-model.trim="contact"
            class="form-control"
            id="floatingInput2"
            placeholder="Contact"
          />
          <label for="floatingInput2">Contact</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            v-model.trim="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            v-model.trim="confirm_password"
            class="form-control"
            id="floatingPassword1"
            placeholder="Confirm Password"
          />
          <label for="floatingPassword1">Confirm Password</label>
        </div>
        <button
          @click="create()"
          class="d-block w-100 btn bg-main text-white mt-4"
        >
          REGISTER
        </button>
      </div>
      <br />
      <small class="d-flex">
        <span class="text-muted">Already have an account ?</span> &nbsp;
        <RouterLink
          :to="{ name: 'teacher-login' }"
          class="text-decoration-none text-maincolor"
        >
          Sign in here.
        </RouterLink>
      </small>
    </div>
  </center>
</template>

<script>
import axios from "axios";

export default {
  name: "teacher-register",
  data() {
    return {
      email: null,
      fullname: null,
      contact: null,
      password: null,
      confirm_password: null,
    };
  },
  mounted() {},
  methods: {
    async create() {
      try {
        const entry = await axios.post(
          import.meta.env.VITE_SERVER + import.meta.env.VITE_API_TEACHER_CREATE,
          {
            email: this.email,
            fullname: this.fullname,
            contact: this.contact,
            password: this.password,
            confirm_password: this.confirm_password,
          }
        );
        const res = entry.data;
        console.log(res);
        if (!res.status) throw res.error;

        alert("Teacher created");
        setTimeout(() => this.$router.push("/teacher"), 1500);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>
