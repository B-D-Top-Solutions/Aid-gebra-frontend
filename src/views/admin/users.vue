<template>
    <Navigation/>
    <br/>
    <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="input-group" style="width:300px">
                <input type="text" class="form-control" v-model="search" placeholder="What are you looking for ?">
                <button class="btn btn-outline-secondary" type="button" @click="loadData()"><i class="bi bi-search text-maincolor"></i></button>
            </div>

            <button class="btn btn-light border shadow-sm" @click="clearModal()" data-bs-toggle="modal" data-bs-target="#user_modal"><i class="bi bi-plus"></i>&nbsp;Create users</button>
        </div>
        <br/>
        <div class="p-2 rounded bg-light">
            <table class="table">
                <thead style="border:none">
                    <tr class="">
                        <th class="text-maincolor">Fullname</th>
                        <th class="text-maincolor">Email</th>
                        <th class="text-maincolor">Role</th>
                        <th class="text-maincolor" style="max-width:150px">Status</th>
                        <th class="text-maincolor" style="max-width:150px">-</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="e in list" v-bind:key="e._id">
                        <td><small>{{e.fullname}}</small></td>
                        <td><small>{{e.email}}</small></td>
                        <td><small>{{e.role}}</small></td>
                        <td><span class="badge bg-success">{{e.status.toUpperCase()}}</span></td>
                        <td><button class="shadow-sm btn btn-sm bg-main text-light" @click="loadUser(e._id)" data-bs-toggle="modal" data-bs-target="#user_modal">Modify</button></td>
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
                        <input type="email" v-model.trim="model.email" class="form-control" id="floatingInput" placeholder="name@example.com">
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model.trim="model.fullname" class="form-control" id="floatingInput1" placeholder="Fullname">
                        <label for="floatingInput1">Fullname</label>
                    </div>
                    <div class="form-floating mb-3">
                        <select v-model.trim="model.status" class="form-select" id="floatingSelect">
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                        </select>
                        <label for="floatingSelect">Status</label>
                    </div>
                    <div class="form-floating mb-3">
                        <select v-model.trim="model.role" class="form-select" id="floatingSelect1">
                            <option value="ADMIN">Admin</option>
                            <option value="STAFF">Staff</option>
                        </select>
                        <label for="floatingSelect1">Role</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" v-if="isUpdate" @click="updateUser()" class="btn text-light bg-main">Save changes</button>
                    <button type="button" v-if="!isUpdate" @click="createUser()" class="btn text-light bg-main">Create</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Navigation from '../../components/admin/navigation.vue'
import auth from '../../utils/authHeader'

export default {
    name : 'admin-users',
    components : {
        Navigation,
    },
    data () {
        return {
            model : {
                email : null,
                fullname : null,
                status : "ACTIVE",
                role : "ADMIN",
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
        auth("admin")
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
                    import.meta.env.VITE_API_ADMIN_USERLIST+params
                )

                const res = entry.data
                console.log(page)
                if(!res.status) throw res.error

                res.data.docs.forEach(e => {
                    list.push({
                        _id : e._id,
                        email : e.email,
                        fullname : e.fullname,
                        role : e.role,
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
            this.model.email = ""
            this.model.fullname = ""
            this.model.role = "ADMIN"
            this.model.id = ""
            this.model.status = "ACTIVE"
            this.isUpdate =false
        },
        async loadUser (id) {
            try{
                this.clearModal()
                this.isUpdate =true 
                const entry = await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_ADMIN_USER+"/"+id
                )

                const res = entry.data
                console.log(res)
                if(!res.status) throw res.error

                this.model.email = res.data.email
                this.model.fullname = res.data.fullname
                this.model.role = res.data.role
                this.model.id = res.data._id
                this.model.status = res.data.status
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async createUser () {
            try{
                if(this.isUpdate) throw "Invalid action"

                const entry = await axios
                .post(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_ADMIN_USERCREATE,
                    {
                        email : this.model.email,
                        fullname : this.model.fullname,
                        role : this.model.role,
                        status : this.model.status,
                        password: "password",
                        confirm_password : "password"
                    }
                )

                const res = entry.data

                if(!res.status) throw res.error

                alert("User created")
                this.clearModal()
                this.loadData()
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        async updateUser () {
            try{
                if(!this.isUpdate) throw "Invalid action"
                
                const entry = await axios
                .put(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_ADMIN_USERUPDATE,
                    {
                        email : this.model.email,
                        fullname : this.model.fullname,
                        role : this.model.role,
                        status : this.model.status,
                        id: this.model.id
                    }
                )

                const res = entry.data

                if(!res.status) throw res.error

                alert(this.model.fullname+" updated")
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