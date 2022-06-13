<template>
    <button class="btn btn-light border shadow-sm" @click="clearModal()" data-bs-toggle="modal" data-bs-target="#user_modal"><i class="bi bi-plus"></i>&nbsp;Create Lesson</button>
    <br/>
    <br/>
    <div class="p-2 rounded bg-light">
        <table class="table">
            <thead style="border:none">
                <tr class="">
                    <th class="text-maincolor">Name</th>
                    <th class="text-maincolor">Order</th>
                    <th class="text-maincolor" style="max-width:150px">-</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="e in lesson" v-bind:key="e._id">
                    <td><small>{{e.name}}</small></td>
                    <td><small>{{e.lessonOrder}}</small></td>
                    <td><button class="shadow-sm btn btn-sm bg-main text-light" @click="viewLesson(e._id)" data-bs-toggle="modal" data-bs-target="#user_modal">Modify</button></td>
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
                    <button type="button" v-if="isUpdate" @click="updateLesson()" class="btn text-light bg-main">Save changes</button>
                    <button type="button" v-if="!isUpdate" @click="createLesson()" class="btn text-light bg-main">Create</button>
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
                name : null,
                status : "ACTIVE",
                order : 0,
                class : this.$route.params.class
            },
            lesson : [],
            isUpdate : false
        }
    },
    mounted () {
        auth("admin")
        this.getLessons()
    },
    methods : {
        clearModal() {
            this.model.name = ""
            this.model.id = ""
            this.model.status = "ACTIVE"
            this.model.order = 0
            this.isUpdate =false
        },
        async createLesson() {
            try{
                if(this.isUpdate) throw "Invalid action"

                const entry = await axios
                .post(
                    import.meta.env.VITE_SERVER+
                    "/api/lessons/create",
                    {
                        name : this.model.name,
                        order : this.model.order,
                        class : this.model.class
                    }
                )

                const res = entry.data
                if(!res.status) throw res.error

                alert("Lesson created")
                this.getLessons()
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async updateLesson() {
            try{
                if(!this.isUpdate) throw "Invalid action"

                const entry = await axios
                .put(
                    import.meta.env.VITE_SERVER+
                    "/api/lessons/"+this.model.id,
                    {
                        name : this.model.name,
                        status : this.model.status
                    }
                )

                const res = entry.data
                if(!res.status) throw res.error

                alert(this.model.name+" updated")
                this.getLessons()
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async viewLesson(id) {
            try{
                this.clearModal()
                this.isUpdate =true 
                
                const entry =  await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    "/api/lessons/"+id+"?class="+this.$route.params.class,
                )

                const res = entry.data
                console.log("VIEW LESSON")
                console.log(res)
                if(!res.status) throw res.error
                this.model.id = res.data._id
                this.model.name = res.data.name
                this.model.status = res.data.status
            }
            catch(error){
                console.log(error)
                alert(error)
            }
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
        }
    }
}
</script>