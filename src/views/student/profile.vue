<template>
  <h1>My Profile</h1>
  <div v-if="isLoading" class="card-body">
    <div class="text-center">
      <h5 class="card-title">Loading...</h5>
    </div>
  </div>
  <div v-if="!isLoading" class="d-flex mt-3 justify-content-between">
    <section class="flex-fill me-3" style="max-width: 500px">
      <p>Note: You must re-login again for the changes to take effect.</p>
      <div class="form-floating mb-3">
        <input
          type="email"
          v-model="model.email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          v-model="model.fullname"
          class="form-control"
          id="floatingInput1"
          placeholder="Username"
        />
        <label for="floatingInput1">Username</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          v-model.trim="model.firstname"
          class="form-control"
          placeholder="First Name"
          id="floating-firstname"
        />
        <label for="floating-firstname">First Name</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          v-model.trim="model.middlename"
          class="form-control"
          placeholder="Middle Name"
          id="floating-middlename"
        />
        <label for="floating-middlename">Middle Name(Optional)</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          v-model.trim="model.lastname"
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
          v-model.trim="model.contact"
          class="form-control"
          placeholder="Contact Number"
        />
      </div>
      <button class="d-block btn bg-main text-white mt-4" @click="updateUser()">
        Save changes
      </button>
      <hr />
      <div class="form-floating mb-3">
        <input
          type="password"
          v-model="model.password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          v-model="model.repassword"
          class="form-control"
          id="floatingPassword1"
          placeholder="Confirm Password"
        />
        <label for="floatingPassword1">Confirm Password</label>
      </div>
      <button
        class="d-block btn bg-main text-white mt-4"
        @click="changePassword()"
      >
        Change password
      </button>
    </section>

    <section class="flex-fill" style="max-width: 350px">
      <div
        class="border rounded d-flex justify-content-center align-items-center overflow-hidden"
        style="height: 350px; width: 100%"
      >
        <img :src="`${image_url}`" style="max-width: 350px" />
      </div>
      <input class="form-control mt-3" type="file" v-on:change="displayImage" />
      <button class="btn bg-main text-white mt-3" @click="changeImage">
        Change Profile image
      </button>
    </section>
  </div>
</template>

<script>
import axiosClient from "../../axios";

export default {
  name: "user-profile",
  data() {
    return {
      isLoading: true,
      model: {
        email: null,
        fullname: null,
        firstname: null,
        middlename: null,
        lastname: null,
        password: null,
        contact: null,
        repassword: null,
        img: null,
      },
      image_url: null,
    };
  },
  mounted() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER + import.meta.env.VITE_API_MEV2
        );
        const res = entry.data;
        if (!res.status) throw res.error;

        console.log(res);

        const realMe = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_STUDENT_SHOW_V2 +
            "/" +
            res.data.id
        );

        const me = realMe.data;
        if (!me.status) throw me.error;

        this.model.email = me.data.email;
        this.model.fullname = me.data.fullname;
        this.model.firstname = me.data.firstname || "";
        this.model.middlename = me.data.middlename || "";
        this.model.lastname = me.data.lastname || "";
        this.model.contact = me.data.contact;
        this.image_url =
          import.meta.env.VITE_SERVER + "/" + me.data.avatar[0]?.path;

        this.isLoading = false;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async changePassword() {
      try {
        const entry = await axiosClient.put(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_UPDATE_PASSWORD_V2,
          {
            new_password: this.model.password,
            confirm_password: this.model.repassword,
          }
        );

        const res = entry.data;

        if (!res.status) throw res.error;

        alert("Password updated");
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async updateUser() {
      try {
        const entry = await axiosClient.put(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_UPDATE_PROFILE_V2,
          {
            email: this.model.email,
            fullname: this.model.fullname,
            firstname: this.model.firstname,
            middlename: this.model.middlename,
            lastname: this.model.lastname,
            contact: this.model.contact,
          }
        );

        const res = entry.data;

        if (!res.status) throw res.error;

        alert("Updated");
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async changeImage() {
      try {
        let form = new FormData();
        form.append("img", this.model.img);

        const entry = await axiosClient.put(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_UPDATE_AVATAR_V2,
          form
        );

        const res = entry.data;

        if (!res.status) throw res.error;

        alert("Updated");
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    displayImage(e) {
      this.model.img = e.target.files[0];
      this.image_url = URL.createObjectURL(e.target.files[0]);
    },
  },
};
</script>
