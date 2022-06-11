<template>
    <Navigation/>
    <br/>
    <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="input-group" style="width:300px">
                <input type="text" class="form-control" v-model="search" placeholder="What are you looking for ?">
                <button class="btn btn-outline-secondary" type="button" @click="loadData()"><i class="bi bi-search text-maincolor"></i></button>
            </div>

            <button class="btn btn-light border shadow-sm" @click="clearModal()" data-bs-toggle="modal" data-bs-target="#user_modal"><i class="bi bi-plus"></i>&nbsp;Create class</button>
        </div>
        <br/>
        <div class="p-2 rounded bg-light">
            <table class="table">
                <thead style="border:none">
                    <tr class="">
                        <th class="text-maincolor">Code</th>
                        <th class="text-maincolor">Name</th>
                        <th class="text-maincolor" style="max-width:150px">Status</th>
                        <th class="text-maincolor" style="max-width:150px">-</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="e in list" v-bind:key="e._id">
                        <td><small>{{e.code}}</small></td>
                        <td><small>{{e.name}}</small></td>
                        <td><span :class="`badge bg-${e.status.toUpperCase() == 'ACTIVE' ? 'success' : 'danger'}`">{{e.status.toUpperCase()}}</span></td>
                        <td><button class="shadow-sm btn btn-sm bg-main text-light" @click="loadClass(e._id)" data-bs-toggle="modal" data-bs-target="#user_modal">Modify</button></td>
                    </tr>
                </tbody>
            </table>
            
            <div class="btn-group" role="group">
                <button type="button" v-if="hasPrevPage" @click="loadData(page - 1)" class="btn btn-outline-secondary">Prev</button>
                <button type="button" class="btn btn-outline-secondary">{{page}}</button>
                <button type="button" v-if="hasNextPage" @click="loadData(page + 1)" class="btn btn-outline-secondary">Next</button>
            </div>
        </div>
    </div>
    
    <div class="modal fade" id="user_modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <input type="hidden" v-model.trim="model.id" />
                    <div class="form-floating mb-3">
                        <input type="email" v-if="isUpdate" readonly v-model.trim="model.code" class="form-control" id="floatingInput" placeholder="Code">
                        <label for="floatingInput">Code</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model.trim="model.name" class="form-control" id="floatingInput1" placeholder="Name">
                        <label for="floatingInput1">Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <select v-model.trim="model.status" class="form-select" id="floatingSelect">
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                        </select>
                        <label for="floatingSelect">Status</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" v-if="isUpdate" @click="updateClass()" class="btn text-light bg-main">Save changes</button>
                    <button type="button" v-if="!isUpdate" @click="createClass()" class="btn text-light bg-main">Create</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Navigation from '../../components/teacher/navigation.vue'
import auth from '../../utils/authHeader'

export default {
    name : 'teacher-class',
    components : {
        Navigation,
    },
    data () {
        return {
            model : {
                code : null,
                name : null,
                status : "ACTIVE",
                id : null
            },
            list : [],
            hasPrevPage : false,
            hasNextPage : false,
            page : 1,
            search : null,
            isUpdate : false
        }
    },
    mounted () {
        auth("teacher")
        this.loadData()
    },
    methods : {
        async loadData (page = 1) {
            try{
                let list = []
                let params = `?page=${page}&${this.search && "search="+this.search}`
                const entry = await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_CLASS_LIST+params
                )

                const res = entry.data
                console.log(page)
                if(!res.status) throw res.error

                res.data.docs.forEach(e => {
                    list.push({
                        _id : e._id,
                        code : e.code,
                        name : e.name,
                        status : e.status,
                    })
                })

                this.list = list
                this.page = res.data.page
                this.hasPrevPage = res.data.hasPrevPage
                this.hasNextPage = res.data.hasNextPage
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        clearModal() {
            this.model.code = ""
            this.model.name = ""
            this.model.id = ""
            this.model.status = "ACTIVE"
            this.isUpdate =false
        },
        async loadClass (id) {
            try{
                this.clearModal()
                this.isUpdate =true 
                const entry = await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_CLASS+"/"+id
                )

                const res = entry.data
                console.log(res)
                if(!res.status) throw res.error

                this.model.code = res.data.code
                this.model.name = res.data.name
                this.model.id = res.data._id
                this.model.status = res.data.status
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async createClass () {
            try{
                if(this.isUpdate) throw "Invalid action"

                const entry = await axios
                .post(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_CLASS_CREATE,
                    {
                        name : this.model.name,
                        status : this.model.status
                    }
                )

                const res = entry.data

                if(!res.status) throw res.error

                alert("Class created")
                this.clearModal()
                this.loadData()
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async updateClass () {
            try{
                if(!this.isUpdate) throw "Invalid action"
                
                const entry = await axios
                .put(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_CLASS+"/"+this.model.id,
                    {
                        name : this.model.name,
                        code : this.model.code,
                        status : this.model.status
                    }
                )

                const res = entry.data

                if(!res.status) throw res.error

                alert(this.model.name+" updated")
                this.loadData()
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        }
    }
}
</script>