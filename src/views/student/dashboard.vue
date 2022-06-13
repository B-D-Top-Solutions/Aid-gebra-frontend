<template>
    <Navigation/>
    <br/>
    <div class="container py-5">
        <img class="img-fluid mb-4" src="/src/assets/images/logo.png" />

        <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#code">
            Join classroom
        </button>

        <div class="d-grid grid-gap2 grid-item-card">
            <!-- cards -->
            <RouterLink v-for="e in list" v-bind:key="e._id" :to="`/student/classroom/${e._id}`" class="main-hover border-hover text-decoration-none border rounded p-3 align-items-center bg-light">
                <span>
                    <small class="text-muted d-block text-center mt-5">Code : {{e.code}}</small>
                    <h3 class="text-muted text-center mb-5">{{e.name}}</h3>
                </span>
                <small class="d-block text-center">{{e.teacher.fullname}}</small>
            </RouterLink>
        </div>
    </div>

    <div class="modal fade" id="code" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <input type="text" v-model.trim="code" class="form-control" placeholder="Classroom code :"/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn text-light bg-main" @click="joinClass()">JOIN</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Navigation from '../../components/students/navigation.vue'
import auth from '../../utils/authHeader'

export default {
    name : 'Dashboard',
    components : {
        Navigation,
    },
    data () {
        return {
            code : null,
            list : []
        }
    },
    mounted () {
        auth("student")
        this.myClass()
    },
    methods : {
        async joinClass(){
            try{
                const entry =  await axios
                .post(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_STUDENT_JOINCLASS+"/"+this.code
                )

                const res = entry.data
                console.log(res)
                if(!res.status) throw res.error

                alert("Your request to join this class is sent!")
                this.myClass()
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async myClass(){
            try{
                const entry =  await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_STUDENT_CLASS+"?enrolledOnly=true"
                )

                const res = entry.data
                console.log(res)
                if(!res.status) throw res.error
                this.list = res.data
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
    }
}
</script>