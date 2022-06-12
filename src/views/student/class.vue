<template>
    <Navigation/>
    <br/>
    <div class="container py-5 position-relative">
        <section class="border-bottom pb-3 d-flex justify-content-between align-items-end ">
            <div class="d-flex align-items-start flex-column">
                <span class="badge bg-warning">{{room.code}}</span>
                <h4 class="m-0">{{room.name}} </h4>
            </div>
            <small class="text-muted">{{room.teacher}}</small>
        </section>

        <section class="d-flex" id="content">
            <div style="max-width:250px;" class="w-100 border-start border-end position-sticky top-0">
                <button class="w-100 btn border-bottom text-start bg-main text-light" type="button" data-bs-toggle="collapse" data-bs-target="#lesson" aria-expanded="false">
                    Lessons
                </button>
                <div class="collapse" id="lesson">
                    <button v-for="e in lesson_list" v-bind:key="e._id"
                    class="btn btn-sm ps-4 text-start w-100 py-2" @click="loadLesson(e._id)">{{e.name}}</button>
                </div>
            </div>
            <div class="flex-fill pt-2 ps-2">
                <Pretest v-if="pretest_done == false" :pretest="pretest"/>
                <div v-if="(content_type == 'concept') && (pretest_done == true)">
                    <span class="badge bg-success mb-3">Concepts</span>
                    <ul class="list-group">
                        <li class="list-group-item" style="cursor:pointer" v-for="e in concept_list" v-bind:key="e._id" @click="loadLecture(e._id)">
                            {{e.name}}
                        </li>
                    </ul>
                </div>

                <div v-if="(pretest_done == true) && (content_type == 'lecture')">
                    <span class="badge bg-success mb-3">Concept</span>&nbsp;
                    <span class="badge bg-success mb-3">Lectures</span>

                    <div class="border rounded p-3 shadow shadow-sm mb-3" v-for="e in lecture_list" v-bind:key="e._id">
                        <h5 class="mb-3 text-subcolor">{{e.name}}</h5>
                        <p class="m-0">{{e.material}}</p>
                    </div>
                    <section v-if="lecture_list.length != 0">
                        <small style="font-size:.7em" class="d-block mb-2">Note : Please study the lecture throughly before proceeding in assessment.</small>
                        <button class="btn btn-primary btn-sm" @click="startAssessment()">Start Assessment</button>
                    </section>
                </div>

                <div v-if="(pretest_done == true) && (content_type == 'assessment')">
                    <span class="badge bg-success mb-3">Concept</span>&nbsp;
                    <span class="badge bg-success mb-3">Lectures</span>&nbsp;
                    <span class="badge bg-success mb-3">Assessment</span>
                    <p class="text-maincolor">{{assessmentCorrectAnswer}} / 5</p>
                    <div class="mb-2 border-bottom" v-if="assessmentQuestion">
                        <p class="text-dark text-boldcolor d-block mb-2">Question : {{assessmentQuestion.question}}</p>
                        <input type="text" class="form-control form-control-sm border-maincolor mb-3" v-model="assessmentAnswer" placeholder="Your answer.."/>
                        <small class="d-block border rounded fw-bold p-2 mb-1">A. {{assessmentQuestion?.choiceA.text}}</small>
                        <small class="d-block border rounded fw-bold p-2 mb-1">B. {{assessmentQuestion?.choiceB.text}}</small>
                        <small class="d-block border rounded fw-bold p-2 mb-1">C. {{assessmentQuestion?.choiceC.text}}</small>
                        <small class="d-block border rounded fw-bold p-2 mb-1">D. {{assessmentQuestion?.choiceD.text}}</small>
                    </div>

                    <small class="text-muted d-block mt-4 mb-2">Please review your answer before you submit.</small>
                    <button class="btn d-block w-100 bg-main text-bolder text-light btn-lg" @click="submitAssessment(assessmentQuestion._id)">Submit</button>
                </div>
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
import Pretest from '../../components/students/pretest.vue'
import auth from '../../utils/authHeader'
export default {
    name : 'student-class',
    components : {
        Navigation,Pretest
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
            concept_list : [],
            content_type : null,
            stats : null,
            pretest_done : null,
            pretest : [],
            lecture_list : [],
            unmastered : [
                "easy",
                "easy",
                "average",
                "average",
                "difficult",
            ],
            mastered : [
                "easy",
                "average",
                "difficult",
                "difficult",
                "difficult",
            ],
            assessment : null,
            mastery : [],
            prevAssessmentQuestion : [],
            assessmentCorrectAnswer : 0,
            assessmentQuestion : null,
            assessmentAnswer : null
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
                console.log("LESSON LIST")
                console.log(this.lesson_list)
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
                this.$router.push({ name: 'student-class', params: { id: this.$route.params.id, lesson : lesson_id } })
                if(!this.pretest_done){
                    return this.showPretest(lesson_id)
                }

                this.lesson_list.forEach( e => {
                    if(e._id == this.$route.params.lesson) this.concept_list = e.concepts
                })

                this.content_type = "concept"
                console.log(this.content_type)
                console.log(this.concept_list)
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async startAssessment () {
            try{
                 const entry = await axios
                .post(
                    import.meta.env.VITE_SERVER+
                    "/api/classroom/class/"+ this.$route.params.id+"/lesson/"+this.$route.params.lesson+"/concept/"+this.$route.params.concept+"/assesment"
                )

                const res = entry.data
                console.log(res)
                if(!res.status) throw res.error
                // if(res.data.status == "COMPLETE") throw "You already completed"
                this.assessment = res.data
                this.mastery = (this.assessment.pretest_concept_mastery == "UNMASTERED") ? this.unmastered : this.mastered
                this.assessmentCorrectAnswer = 0
                this.loadAssessment()
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async loadAssessment(){
            try{
                const entry = await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    "/api/classroom/class/"+ this.$route.params.id+"/lesson/"+this.$route.params.lesson+"/concept/"+this.$route.params.concept+"/assesment/?difficulty="+this.mastery[0]+"&prev="+this.prevAssessmentQuestion.join(",")
                )
                
                const res = entry.data
                console.log(res)
                if(!res.status) throw res.error

                this.content_type = "assessment"
                this.assessmentAnswer = null
                this.assessmentQuestion = res.data
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async submitAssessment (question_id) {
            try{
                const entry = await axios
                .post(
                    import.meta.env.VITE_SERVER+
                    "/api/classroom/class/"+ this.$route.params.id+"/lesson/"+this.$route.params.lesson+"/concept/"+this.$route.params.concept+"/assesment/"+this.assessment.assessment_uuid+"/submit",
                    {
                        question : question_id,
                        answer : this.assessmentAnswer
                    }
                )
                const res = entry.data
                console.log(res)
                if(!res.status) throw res.error

                this.prevAssessmentQuestion.push(question_id)
                console.log(this.mastery)
                if(res.data == "CORRECT"){
                    this.mastery.shift()
                    this.assessmentCorrectAnswer += 1

                    if(this.mastery.length) this.loadAssessment()
                }
                else{
                    this.loadAssessment()
                }
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async loadLecture(concept_id){
            try{
                this.$router.push({ name: 'student-class', 
                    params: { 
                        id: this.$route.params.id, 
                        lesson :  this.$route.params.lesson, 
                        concept : concept_id
                    }
                })

                const entry = await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    "/api/lectures?concept="+concept_id
                )

                const res = entry.data
                console.log(res)
                if(!res.status) throw res.error

                this.content_type = "lecture"
                this.lecture_list = res.data
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
                
                let list = []

                for(let i = 1 ; i <= 20 ; i++){
                    list.push({...res.data[0]["question"+i]})
                }

                this.pretest = list
                console.log(this.pretest)
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        }
    }
}
</script>