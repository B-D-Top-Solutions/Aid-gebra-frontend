<template>
    <Navigation/>
    <br/>
    <div class="container py-5">
        <section class="border-bottom pb-3 d-flex justify-content-between align-items-end ">
            <h4 class="m-0">[{{room.code}}] {{room.name}}</h4>

            <small class="text-muted">{{room.teacher}}</small>
        </section>

        <section class="d-flex" id="content">
            <div style="max-width:250px;" class="w-100 border-start border-end">
                <button class="w-100 btn border-bottom text-start bg-main text-light" type="button" data-bs-toggle="collapse" data-bs-target="#lesson" aria-expanded="false">
                    Lessons
                </button>
                <div class="collapse" id="lesson">
                    <button v-for="e in lesson_list" v-bind:key="e._id"
                    class="btn btn-sm ps-4 text-start w-100 py-2" @click="loadLesson(e._id)">{{e.name}}</button>
                </div>
            </div>
            <div class="flex-fill pt-2 ps-2">
                ...
            </div>
        </section>
    </div>
</template>
<style>
    #content button,
    #content a ,
    #content .btn,
    #content .btn:focus{
        box-shadow:unset !important;
    }
</style>
<script>
import axios from 'axios'
import Navigation from '../../components/students/navigation.vue'
import auth from '../../utils/authHeader'
export default {
    name : 'student-class',
    components : {
        Navigation,
    },
    data () {
        return {
            room : {
                code : null,
                name : null,
                teacher : null
            },
            lesson_list : [],
            selected_lession : null,
            content_type : null,
            stats : null,
            pretest_done : false,
            pretest : []
        }
    },
    mounted () {
        auth("student")
        this.getClass()
    },
    methods : {
        async getClass () {
            try{
                const room = this.$route.params.id

                const entry = await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_CLASS+"/"+room
                )

                const res = entry.data
                console.log(res)
                if(!res.status) throw res.error
                
                this.room.code = res.data.code
                this.room.name = res.data.name
                this.room.teacher = res.data.teacher.fullname

                this.lesson_list = res.data.lessons

                this.myClassInfo()
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async myClassInfo () {
            try{
                const room = this.$route.params.id

                const entry = await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_STUDENT_CLASS+"/"+room+"/info"
                )

                const res = entry.data
                console.log(res)
                if(!res.status) throw res.error
                this.stats = res.data
                this.pretest_done = this.stats.studentInfo.lessons[0]?.pretest_score ? true : false
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async loadLesson(lesson_id) {
            try{
                if(!this.pretest_done){
                    this.showPretest(lesson_id)
                }
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async showPretest(lesson_id) {
            try{
                const entry = await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_PRETEST+"?lesson="+lesson_id
                )

                const res = entry.data
                console.log(res)
                if(!res.status) throw res.error
                
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        }
    }
}
</script>