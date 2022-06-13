<template>
    <button class="btn btn-light border shadow-sm" v-if="!hasTest" @click="createPretest()"><i class="bi bi-plus"></i>&nbsp;Save test</button>
    <br/>
    <br/>
    <small class="text-subcolor">Select Lesson : </small>
    <select class="form-control mb-3" style="max-width:250px" @change="(e) => pickLesson(e.target.value)">
        <option value="">--Select Lessons--</option>
        <option v-for="e in lesson" v-bind:key="e._id" :value="e._id">{{e.name}}</option>
    </select>

    <div class="my-3 border-bottom rounded bg-white shadow-sm p-3" v-for="e in pretest" v-bind:key="e._id">
        <small>Question : </small>
        <input class="d-block border-maincolor form-control form-control-sm mb-2" v-model="e.question"/>
        <div class="form-floating mb-2">
            <select v-model.trim="e.difficulty" class="form-select form-select-sm border-maincolor" id="floatingSelect">
                <option value="EASY">EASY</option>
                <option value="AVERAGE">AVERAGE</option>
                <option value="DIFFICULT">DIFFICULT</option>
            </select>
            <label for="floatingSelect">Difficulty</label>
        </div>
        <small>Answer : </small>
        <input class="d-block border-maincolor form-control form-control-sm mb-2" v-model="e.answer"/>

        <small>Choice A : </small>
        <input class="d-block border-maincolor form-control form-control-sm mb-1" v-model="e.choiceA"/>

        <small>Choice B : </small>
        <input class="d-block border-maincolor form-control form-control-sm mb-1" v-model="e.choiceB"/>
        
        <small>Choice C : </small>
        <input class="d-block border-maincolor form-control form-control-sm mb-1" v-model="e.choiceC"/>

        <small>Choice D : </small>
        <input class="d-block border-maincolor form-control form-control-sm mb-1" v-model="e.choiceD"/>
    </div>

    <!-- <button class="btn bg-main text-light d-block w-100 btn-lg" v-if="hasTest">SAVE CHANGES</button> -->

    <!-- <slot/> = props.children -->
</template>

<script>
import axios from 'axios'
import auth from '../../utils/authHeader'

export default {
    name : "admin-lesson",
    data () {
        return {
            lesson : [],
            pretest : [],
            selectedLesson : null,
            isUpdate : false,
            hasTest : false
        }
    },
    mounted () {
        auth("admin")
        this.getLessons()

        for(let i = 1 ; i <= 20; i++){
            this.pretest.push({
                question : "",
                difficulty : "EASY",
                choiceA : "",
                choiceB : "",
                choiceC : "",
                choiceD : "",
                answer : ""
            })
        }
        console.log(this.pretest)
    },
    methods : {
        clearModal() {
            this.model.name = ""
            this.model.id = ""
            this.model.status = "ACTIVE"
            this.model.order = 0
            this.isUpdate =false
        },
        async getLessons(){
            try{
                const entry =  await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    "/api/lessons?class="+this.$route.params.class,
                )

                const res = entry.data
                console.log("LESSONS")
                console.log(res)
                if(!res.status) throw res.error
                this.lesson = res.data
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        pickLesson(e){
            this.selectedLesson = e
                
            for(let i = 1 ; i <= 20; i++){
                this.pretest.push({
                    question : "",
                    difficulty : "EASY",
                    choiceA : "",
                    choiceB : "",
                    choiceC : "",
                    choiceD : "",
                    answer : ""
                })
            }

            this.getPretest()
        },
        async createPretest() {
            try{
                if(this.isUpdate) throw "Invalid action"
                if(!this.selectedLesson) throw "Please select a lesson"

                let c = []

                this.lesson.forEach(e => {
                    if(e._id == this.selectedLesson) {
                        c = e.concepts
                    }
                })

                if(c.length != 5) throw "You need atleast 5 concepts on this lesson"

                let set = {
                    lesson : this.selectedLesson
                }

                let counter = 1

                for(const i in c){
                    set["concept"+counter] = c[i]
                    counter++
                }

                let counter1 = 1

                for(const i in this.pretest){
                    set["question"+counter1] = {...this.pretest[i]}
                    counter1++
                }

                console.log(set)

                const entry = await axios
                .post(
                    import.meta.env.VITE_SERVER+
                    "/api/posttest",
                    set
                )

                const res = entry.data
                if(!res.status) throw res.error

                alert("pretest created")
                this.getPretest()
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async getPretest(){
            try{
                if(!this.selectedLesson) return this.concept = []

                const entry =  await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    "/api/posttest?lesson="+this.selectedLesson,
                )

                const res = entry.data
                console.log("Pretest")
                console.log(res)
                if(!res.status) throw res.error
                this.pretest = []

                if(!res.data.length) {
                    for(let i = 1 ; i <= 20; i++){
                        this.pretest.push({
                            question : "",
                            difficulty : "EASY",
                            choiceA : "",
                            choiceB : "",
                            choiceC : "",
                            choiceD : "",
                            answer : ""
                        })
                    }
                    this.hasTest = false
                    return
                } 

                for(let i = 1 ; i <= 20 ; i++){
                    this.pretest.push({
                        ...res.data[0]["question"+i],
                        choiceA : res.data[0]["question"+i]?.choiceA?.value || "",
                        choiceB : res.data[0]["question"+i]?.choiceB?.value || "",
                        choiceC : res.data[0]["question"+i]?.choiceC?.value || "",
                        choiceD : res.data[0]["question"+i]?.choiceD?.value || ""
                    })
                }
                this.hasTest = true
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