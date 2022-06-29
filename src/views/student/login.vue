<template>
  <div class="row rounded pt-5">
    <div class="col-md p-5 " style="background-color:#ADEFD1;border-radius: 20px 0 0 20px;">
      <h1 class="mb-3 fw-bolder">Login</h1>
      <p>Good to see you again!</p>
    </div>
    <div class="col-md p-5 bg-light" style="border-radius: 0 20px 20px 0;">
      <h1 class="mb-5">Welcome, students!</h1>
      <form @submit="login">
        <div class="form-floating mb-3">
          <input
            type="email"
            v-model.trim="student.email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            v-model.trim="student.password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button class="btn mt-2" @click="sendPasswordLink">Forget Password ?</button>
        <button type="submit" class="d-block w-100 btn bg-main text-white mt-4 p-3">
          SIGN IN
        </button>
      </form>
      <br />
      <small class="d-flex justify-content-center">
        <span class="text-muted">Don't have an account ?</span> &nbsp;
        <RouterLink
          :to="{ name: 'student-register' }"
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

const student = {
  email: "",
  password: "",
  role: "STUDENT",
};

async function sendPasswordLink(){
  try{
    const d = await axios.get(
        import.meta.env.VITE_SERVER+"/api/v2/auth/forgotpassword/link?email="+student.email+"&role=STUDENT"
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
  ev.preventDefault();
  store.dispatch("login", student).then((data) => {
    if (data.status == true) {
      router.push({ name: "student-dashboard" });
    } else {
      if(data.error == 'Password is required!') return
      alert(data.error);
    }
  });
}
</script>
