<template>
    <button class="btn btn-light border shadow-sm" @click="clearModal()" data-bs-toggle="modal" data-bs-target="#user_modal"><i class="bi bi-plus"></i>&nbsp;Create Question</button>
    <br/>
    <br/>
    <small class="text-subcolor">Select Lesson : </small>
    <select class="form-control mb-3" style="max-width:250px" @change="(e) => pickLesson(e.target.value)">
        <option value="">--Select Lessons--</option>
        <option v-for="e in lesson" v-bind:key="e._id" :value="e._id">{{e.name}}</option>
    </select>

    <small class="text-subcolor">Select Concept : </small>
    <select class="form-control mb-3" style="max-width:250px" @change="(e) => pickConcept(e.target.value)">
        <option value="">--Select Concepts--</option>
        <option v-for="e in concept" v-bind:key="e._id" :value="e._id">{{e.name}}</option>
    </select>

    <div class="p-2 rounded bg-light">
        <table class="table">
            <thead style="border:none">
                <tr class="">
                    <th class="text-maincolor">Question</th>
                    <th class="text-maincolor">Difficulty</th>
                    <th class="text-maincolor" style="max-width:150px">-</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="e in question" v-bind:key="e._id">
                    <td><small>{{e.question}}</small></td>
                    <td><small>{{e.difficulty}}</small></td>
                    <td>
                        <button class="shadow-sm btn btn-sm bg-main text-light" @click="viewQuestion(e._id)" data-bs-toggle="modal" data-bs-target="#user_modal">Modify</button> &nbsp;
                        <!-- <button class="shadow-sm btn btn-sm bg-danger text-light" @click="deleteQuestion(e._id)">Delete</button> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div class="modal fade" id="user_modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <input type="hidden" v-model.trim="model.id" />
                    <div class="form-floating mb-3">
                        <input type="text" v-model.trim="model.question" class="form-control" id="floatingInput1" placeholder="Question">
                        <label for="floatingInput1">Question</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model.trim="model.answer" class="form-control" id="floatingInput2" placeholder="Material">
                        <label for="floatingInput2">Answer</label>
                    </div>
                    <div class="form-floating mb-3">
                        <select v-model.trim="model.difficulty" class="form-select" id="floatingSelect">
                            <option value="EASY">Easy</option>
                            <option value="AVERAGE">AVERAGE</option>
                            <option value="DIFFICULT">DIFFICULT</option>
                        </select>
                        <label for="floatingSelect">Status</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model.trim="model.choiceA" class="form-control" id="floatingInput3" placeholder="Choice A">
                        <label for="floatingInput3">Choice A :</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model.trim="model.choiceB" class="form-control" id="floatingInput4" placeholder="Choice B">
                        <label for="floatingInput4">Choice B :</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model.trim="model.choiceC" class="form-control" id="floatingInput5" placeholder="Choice C">
                        <label for="floatingInput5">Choice C :</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model.trim="model.choiceD" class="form-control" id="floatingInput6" placeholder="Choice D">
                        <label for="floatingInput6">Choice D :</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" v-if="isUpdate" @click="updateQuestion()" class="btn text-light bg-main">Save changes</button>
                    <button type="button" v-if="!isUpdate" @click="createQuestion()" class="btn text-light bg-main">Create</button>
                </div>
            </div>
        </div>
    </div>
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
                question : null,
                difficulty : "EASY",
                choiceA : null,
                choiceB : null,
                choiceC : null,
                choiceD : null,
                answer : null,
            },
            lesson : [],
            concept : [],
            question : [],
            selectedLesson : null,
            selectedConcept : null,
            isUpdate : false
        }
    },
    mounted () {
        auth("admin")
        this.getLessons()
    },
    methods : {
        clearModal() {
            this.model.id = null
            this.model.question = null
            this.model.difficulty = "EASY"
            this.model.choiceA = null
            this.model.choiceB = null
            this.model.choiceC = null
            this.model.choiceD = null
            this.model.answer = null
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
        async getConcept(){
            try{
                if(!this.selectedLesson) return this.concept = []

                const entry =  await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    "/api/concepts?lesson="+this.selectedLesson,
                )

                const res = entry.data
                console.log("CONCEPT")
                console.log(res)
                if(!res.status) throw res.error
                this.concept = res.data
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        pickLesson(e){
            this.selectedLesson = e
            this.getConcept()
            this.question = []
        },
        pickConcept(e){
            this.selectedConcept = e
            this.getQuestion()
        },
        async viewQuestion(id) {
            try{
                this.clearModal()
                this.isUpdate =true 
                
                const entry =  await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    "/api/questions/"+id,
                )

                const res = entry.data
                console.log("VIEW QUESTION")
                console.log(res)
                if(!res.status) throw res.error
                this.model.id = res.data._id
                this.model.question =  res.data.question
                this.model.difficulty =  res.data.difficulty
                this.model.choiceA =  res.data.choiceA.value
                this.model.choiceB =  res.data.choiceB.value
                this.model.choiceC =  res.data.choiceC.value
                this.model.choiceD =  res.data.choiceD.value
                this.model.answer =  res.data.answer
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async updateQuestion() {
            try{
                if(!this.isUpdate) throw "Invalid action"

                const entry = await axios
                .put(
                    import.meta.env.VITE_SERVER+
                    "/api/questions/"+this.model.id,
                    {
                        question : this.model.question,
                        difficulty : this.model.difficulty,
                        choiceA : this.model.choiceA,
                        choiceB : this.model.choiceB,
                        choiceC : this.model.choiceC,
                        choiceD : this.model.choiceD,
                        answer : this.model.answer
                    }
                )

                const res = entry.data
                if(!res.status) throw res.error

                alert(this.model.question+" updated")
                this.getQuestion()
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async createQuestion() {
            try{
                if(this.isUpdate) throw "Invalid action"
                if(!this.selectedConcept) throw "Please select a concept"

                const entry = await axios
                .post(
                    import.meta.env.VITE_SERVER+
                    "/api/questions/",
                    {
                        concept : this.selectedConcept,
                        question : this.model.question,
                        difficulty : this.model.difficulty,
                        choiceA : this.model.choiceA,
                        choiceB : this.model.choiceB,
                        choiceC : this.model.choiceC,
                        choiceD : this.model.choiceD,
                        answer : this.model.answer
                    }
                )

                const res = entry.data
                if(!res.status) throw res.error

                alert("Question created")
                this.getQuestion()
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async getQuestion () {
            try{
                if(!this.selectedConcept) return this.concept = []

                const entry =  await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    "/api/questions?concept="+this.selectedConcept,
                )

                const res = entry.data
                console.log("QUESTION")
                console.log(res)
                if(!res.status) throw res.error
                this.question = res.data
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        }
    },
}
</script>