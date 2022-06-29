<template>
    <center>
        <div class="display-6 mt-5 pt-5 text-light">{{ !success ? 'Verifying your email, Please wait...' : 'Email is now verified'}}</div>
    </center>
</template>

<script>
    import axios from 'axios'

export default {
  name: "email-verify",
  data () {
    return {
        success : false
    }
  },
  mounted() {
    this.verify();
  },
  methods: {
    async verify () {
        try{
            const id = this.$route.query.id
            const role = this.$route.query.role

            if(!role || !id) throw "Missing params"

            const d = await axios.get(
                import.meta.env.VITE_SERVER+"/api/v2/auth/verify?id="+id+"&role="+role
            )

            if(d.data.data){
                this.success = true
            }
            else{
                throw d.data.error
            }
        }
        catch(error){
            alert(error)
        }
    }
  },
};
</script>