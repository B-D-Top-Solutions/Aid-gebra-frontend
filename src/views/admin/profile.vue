<template>
    <Navigation/>
    <br/>
    <div class="container py-5">
        <h1>Admin Profile</h1>
        <div class="d-flex mt-3 justify-content-between">
            <section class="flex-fill me-3" style="max-width:500px">
                <div class="form-floating mb-3">
                    <input type="email" v-model="model.email" class="form-control" id="floatingInput" placeholder="name@example.com">
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" v-model="model.fullname" class="form-control" id="floatingInput1" placeholder="Fullname">
                    <label for="floatingInput1">Fullname</label>
                </div>
                <button class="d-block btn bg-main text-white mt-4" @click="updateUser">Save changes</button>
                <hr>
                <div class="form-floating mb-3">
                    <input type="password" v-model="model.password" class="form-control" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating">
                    <input type="password" v-model="model.repassword" class="form-control" id="floatingPassword1" placeholder="Confirm Password">
                    <label for="floatingPassword1">Confirm Password</label>
                </div>
                <button class="d-block btn bg-main text-white mt-4" @click="changePassword">Change password</button>
            </section>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import Navigation from '../../components/admin/navigation.vue'
import auth from '../../utils/authHeader'

export default {
    name : 'admin-profile',
    components : {
        Navigation,
    },
    data () {
        return {
            model : {
                email : null,
                fullname : null,
                password : null,
                repassword : null
            }
        }
    },
    mounted () {
        auth("admin")
        this.loadUser()
    },
    methods : {
        async loadUser () {
            try{
                const entry = await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_ME
                )

                const res = entry.data
                console.log(res)
                if(!res.status) throw res.error

                const entry1 = await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_ADMIN_USER+"/"+res.data.id
                )

                const res1 = entry1.data
                console.log(res1)
                if(!res1.status) throw res1.error


                this.model.email = res1.data.email
                this.model.fullname = res1.data.fullname
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async changePassword () {
            try{
                const entry = await axios
                .put(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_ADMIN_CHANGEPASSWORD,
                    {
                        new_password : this.model.password,
                        confirm_password : this.model.repassword
                    }
                )

                const res = entry.data

                if(!res.status) throw res.error

                alert("Password updated")
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async updateUser () {
            try{
                const entry = await axios
                .put(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_ADMIN_PROFILEUPDATE,
                    {
                        email : this.model.email,
                        fullname : this.model.fullname
                    }
                )

                const res = entry.data

                if(!res.status) throw res.error

                alert("Updated")
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        }
    }
}
</script>