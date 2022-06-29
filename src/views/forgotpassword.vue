<template>
    <div class="container mt-5 mb-5" style="max-width:450px">
        <div class="form-floating mb-3">
            <input type="password" v-model.trim="password" class="form-control" id="floatingPassword"
                placeholder="Password" />
            <label for="floatingPassword">New Password</label>
        </div>
        <div class="form-floating">
            <input type="password" v-model.trim="repassword" class="form-control" id="floatingPassword1"
                placeholder="Confirm Password" />
            <label for="floatingPassword1">Confirm Password</label>
        </div>
        <button type="submit" @click='save' class="p-3 d-block w-100 btn bg-main mt-4" style="background-color:#adefd1">
            Save
        </button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "forgot-password",
    data() {
        return {
            password : null,
            repassword : null
        }
    },
    mounted() {
    },
    methods: {
        async save() {
            try {
                const email = this.$route.query.email
                const role = this.$route.query.role

                if (!role || !email) throw "Missing params"

                const d = await axios.post(
                    import.meta.env.VITE_SERVER + "/api/v2/auth/forgotpassword/save?email=" + email + "&role=" + role,
                    {
                        password : this.password, repassword : this.repassword
                    },
                    {
                        headers : {
                            "Content-Type": "Application/json"
                        }
                    }
                )
                console.log(d)
                if (d.data.data) {
                    alert("Password Changed")
                    this.password = null
                    this.repassword = null
                }
                else {
                    throw d.data.error
                }
            }
            catch (error) {
                alert(error)
            }
        }
    },
};
</script>