<template>
    <Navigation/>
    <br/>
    <div class="container py-5">
        <h1>Student Profile</h1>
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
                <div class="form-floating mb-3">
                    <input type="text" v-model="model.contact" class="form-control" id="floatingInput2" placeholder="Contact">
                    <label for="floatingInput2">Contact</label>
                </div>
                <button class="d-block btn bg-main text-white mt-4" @click="updateUser()">Save changes</button>
                <hr>
                <div class="form-floating mb-3">
                    <input type="password" v-model="model.password" class="form-control" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating">
                    <input type="password" v-model="model.repassword" class="form-control" id="floatingPassword1" placeholder="Confirm Password">
                    <label for="floatingPassword1">Confirm Password</label>
                </div>
                <button class="d-block btn bg-main text-white mt-4" @click="changePassword()">Change password</button>
            </section>
            
            <section class="flex-fill" style="max-width:350px">
                <div class="border rounded d-flex justify-content-center align-items-center overflow-hidden" style="height:350px;width:100%;">
                    <img :src="`${image_url}`" style="max-width:350px"/>
                </div>
                <input class="form-control mt-3" type="file" v-on:change="displayImage"/>
                <button class="btn bg-main text-white mt-3" @click="changeImage">Change Profile image</button>
            </section>
        </div>
    </div>
</template>

<script>
import Navigation from '../../components/teacher/navigation.vue'
import auth from '../../utils/authHeader'
import axios from 'axios'

export default {
    name : 'teacher-profile',
    components : {
        Navigation,
    },
    data () {
        return {
            model : {
                email : null,
                fullname : null,
                password : null,
                contact : null,
                repassword : null,
                img : null
            },
            image_url : null
        }
    },
    mounted () {
        auth("teacher")
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
                    import.meta.env.VITE_API_TEACHER_USER+"/"+res.data.id
                )

                const res1 = entry1.data
                console.log(res1)
                if(!res1.status) throw res1.error


                this.model.email = res1.data.email
                this.model.fullname = res1.data.fullname
                this.model.contact = res1.data.contact
                this.image_url = import.meta.env.VITE_SERVER+"/"+res1.data.avatar[0]?.path
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
                    import.meta.env.VITE_API_TEACHER_CHANGEPASSWORD,
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
                    import.meta.env.VITE_API_TEACHER_PROFILEUPDATE,
                    {
                        email : this.model.email,
                        fullname : this.model.fullname,
                        contact : this.model.contact
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
        },
        async changeImage () {
            try{
                let form = new FormData()
                form.append('img', this.model.img)
                
                const entry = await axios
                .put(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_TEACHER_PROFILEIMAGE,
                    form
                )

                const res = entry.data

                if(!res.status) throw res.error

                alert("Updated")
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        displayImage(e) {
            console.log(e)
            this.model.img = e.target.files[0]
            this.image_url = URL.createObjectURL(e.target.files[0])
        }
    }
}
</script>