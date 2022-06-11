<template>
    <div class="container py-5">
        <h1 class="text-maincolor text-center mb-5">Welcome Teacher!</h1>
        <center>
            <div style="max-width:450px">
                <div class="rounded border p-4">
                    <div class="form-floating mb-3">
                        <input type="email" v-model.trim="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" v-model.trim="password" class="form-control" id="floatingPassword" placeholder="Password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button class="d-block w-100 btn bg-main text-white mt-4" @click="login()">SIGN IN</button>
                </div>
                <br/>
                <small class="d-flex">
                    <span class="text-muted">Don't have an account ? </span> &nbsp;
                    <RouterLink to="/teacher/register" class="text-decoration-none text-maincolor">
                        Register here.
                    </RouterLink>
                </small>
            </div>
        </center>
    </div>
</template>

<script>

import axios from 'axios';
import auth from '../../utils/authHeader'

export default {
    name : 'teacher-login',
    data(){
        return {
            email : null,
            password : null
        }
    },
    mounted () {
        
    },
    methods : {
        async login(){
            try{
                const entry =  await axios
                .post(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_TEACHER_LOGIN,{
                    email : this.email,
                    password : this.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const res = entry.data
                if(!res.status) throw res.error

                localStorage.setItem( 'teacher-token', res.token );
                auth("teacher")
                alert("Logged!")
                this.$router.push({name:"teacher-dashboard"})
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        }
    }
}
</script>