<template>
    <button class="btn btn-light border shadow-sm" v-if="!hasTest"><i class="bi bi-plus"></i>&nbsp;Save test</button>
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

    <button class="btn bg-main text-light d-block w-100 btn-lg" v-if="hasTest">SAVE CHANGES</button>
<!--     
    <div class="modal fade" id="user_modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <input type="hidden" v-model.trim="model.id" />
                    <div class="form-floating mb-3">
                        <input type="text" v-model.trim="model.name" class="form-control" id="floatingInput1" placeholder="Name">
                        <label for="floatingInput1">Name</label>
                    </div>
                    <div class="form-floating mb-3" v-if="!isUpdate">
                        <input type="text" v-model.trim="model.order" class="form-control" id="floatingInput2" placeholder="Name">
                        <label for="floatingInput2">Order</label>
                    </div>
                    <div class="form-floating mb-3" v-if="isUpdate">
                        <select v-model.trim="model.status" class="form-select" id="floatingSelect">
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                        </select>
                        <label for="floatingSelect">Status</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" v-if="isUpdate" @click="updateConcept()" class="btn text-light bg-main">Save changes</button>
                    <button type="button" v-if="!isUpdate" @click="createConcept()" class="btn text-light bg-main">Create</button>
                </div>
            </div>
        </div>
    </div> -->
    <!-- <slot/> = props.children -->
</template>

<script>
import axios from 'axios'
import auth from '../../utils/authHeader'

export default {
    name : "admin-lesson",
    data () {
        return {
            model : {
                id : null,
                name : null,
                status : "ACTIVE",
                order : 0,
            },
            lesson : [],
            pretest : [

            ],
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
                difficulty : "",
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
                    difficulty : "",
                    choiceA : "",
                    choiceB : "",
                    choiceC : "",
                    choiceD : "",
                    answer : ""
                })
            }

            this.getPretest()
        },
        async updatePreTest() {
            try{
                if(!this.isUpdate) throw "Invalid action"
                const data = {
                    
                }

                return
                const entry = await axios
                .put(
                    import.meta.env.VITE_SERVER+
                    "/api/concepts/"+this.model.id,
                    {
                        name : this.model.name,
                        status : this.model.status
                    }
                )

                const res = entry.data
                if(!res.status) throw res.error

                alert(this.model.name+" updated")
                this.getPretest()
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async createConcept() {
            try{
                if(this.isUpdate) throw "Invalid action"
                if(!this.selectedLesson) throw "Please select a lesson"

                const entry = await axios
                .post(
                    import.meta.env.VITE_SERVER+
                    "/api/concepts/create",
                    {
                        name : this.model.name,
                        order : this.model.order,
                        lesson : this.selectedLesson
                    }
                )

                const res = entry.data
                if(!res.status) throw res.error

                alert("Concept created")
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
                    "/api/pretest?lesson="+this.selectedLesson,
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
                            difficulty : "",
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