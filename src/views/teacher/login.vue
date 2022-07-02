<template>
  <div class="row rounded pt-5">
    <div class="col-md p-5 " style="background-color:#ADEFD1;border-radius: 20px 0 0 20px;">
      <h1 class="mb-3 fw-bolder">Login</h1>
      <p>Good to see you again!</p>
    </div>
    <div class="col-md p-5 bg-light" style="border-radius: 0 20px 20px 0;">
      <h1 class="mb-5">Welcome, teachers!</h1>
      <div>
        <div class="form-floating mb-13">
          <input
            type="email"
            v-model.trim="teacher.email"
            class="form-control mb-3"
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
        <button class="btn mt-2" @click="sendPasswordLink">Forgot Password ?</button>
        <button class="d-block w-100 btn bg-main text-white mt-4 p-3" type="submit" @click="login">
          LOG IN
        </button>
      </div>
      <br />
      <small class="d-flex justify-content-center">
        <span class="text-muted">Don't have an account ? </span> &nbsp;
        <RouterLink
          :to="{ name: 'teacher-register' }"
          class="text-decoration-none text-maincolor"
        >
          Register here.
        </RouterLink>
      </small>
    </div>
  </div>
</template>

<script setup>
import store from "../../store";
import { useRouter } from "vue-router";
import axios from 'axios'

const router = useRouter();

const teacher = {
  email: "",
  password: "",
  role: "TEACHER",
};

async function sendPasswordLink(){
  try{
    const d = await axios.get(
        import.meta.env.VITE_SERVER+"/api/v2/auth/forgotpassword/link?email="+teacher.email+"&role=TEACHER"
    )
    console.log(d)
    if(d.data.data){
        alert("Password reset Link sent thru your email")
    }
    else{
        throw d.data.error
    }
  }
  catch(error){
      alert(error)
  }
}

function login(ev) {
  // ev.preventDefault();
  store.dispatch("login", teacher).then((data) => {
    if (data.status == true) {
      router.push({ name: "teacher-dashboard" });
    } else {
      if(data.error == 'Password is required!') return
      alert(data.error);
    }
  });
}
</script>
