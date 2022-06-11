<template>
    <Navigation/>
    <br/>
    <div class="container py-5">
        <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#code">
            Join classroom
        </button>

        <div class="d-grid grid-gap2 grid-item-card">
            <!-- cards -->
            
            <RouterLink to="/student/classroom" class="text-decoration-none border rounded p-3 align-items-center bg-light">
                <h3 class="text-muted text-center my-5">Class #1323</h3>
                <small class="d-block text-center">Anna marie</small>
            </RouterLink>
            <RouterLink to="/student/classroom" class="text-decoration-none border rounded p-3 align-items-center bg-light">
                <h3 class="text-muted text-center my-5">Class #1323</h3>
                <small class="d-block text-center">Anna marie</small>
            </RouterLink>
            <RouterLink to="/student/classroom" class="text-decoration-none border rounded p-3 align-items-center bg-light">
                <h3 class="text-muted text-center my-5">Class #1323</h3>
                <small class="d-block text-center">Anna marie</small>
            </RouterLink>
            <RouterLink to="/student/classroom" class="text-decoration-none border rounded p-3 align-items-center bg-light">
                <h3 class="text-muted text-center my-5">Class #1323</h3>
                <small class="d-block text-center">Anna marie</small>
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
            code : null
        }
    },
    mounted () {
        auth("student")
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

                alert("JOINED!")
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        }
    }
}
</script>