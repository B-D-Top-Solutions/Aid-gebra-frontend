<template>
    <Navigation/>
    <br/>
    <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="input-group" style="width:300px">
                <input type="text" class="form-control" placeholder="What are you looking for ?">
                <button class="btn btn-outline-secondary" type="button"><i class="bi bi-search text-maincolor"></i></button>
            </div>

            <button class="btn btn-light border shadow-sm" data-bs-toggle="modal" data-bs-target="#user_modal"><i class="bi bi-plus"></i>&nbsp;Create users</button>
        </div>
        <br/>
        <table class="table caption-top">
            <caption>List of users</caption>
            <thead style="border:none">
                <tr class="bg-main">
                    <th class="text-light">Fullname</th>
                    <th class="text-light">Email</th>
                    <th class="text-light">Role</th>
                    <th class="text-light" style="max-width:150px">Status</th>
                    <th class="text-light" style="max-width:150px">-</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><small>test 1</small></td>
                    <td><small>test 1</small></td>
                    <td><small>test 1</small></td>
                    <td><span class="badge bg-success">Active</span></td>
                    <td><button class="shadow-sm btn btn-sm bg-main text-light" data-bs-toggle="modal" data-bs-target="#user_modal">Modify</button></td>
                </tr>
            </tbody>
        </table>
        
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-secondary">Prev</button>
            <button type="button" class="btn btn-outline-secondary">1</button>
            <button type="button" class="btn btn-outline-secondary">Next</button>
        </div>
    </div>
    
    <div class="modal fade" id="user_modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <input type="hidden" />
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput1" placeholder="Fullname">
                        <label for="floatingInput1">Fullname</label>
                    </div>
                    <div class="form-floating mb-3">
                        <select class="form-select" id="floatingSelect">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <label for="floatingSelect">Status</label>
                    </div>
                    <div class="form-floating mb-3">
                        <select class="form-select" id="floatingSelect1">
                            <option value="ADMIN">Admin</option>
                            <option value="STAFF">Staff</option>
                        </select>
                        <label for="floatingSelect1">Role</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn text-light bg-main">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '../../components/admin/navigation.vue'

export default {
    name : 'admin-users',
    components : {
        Navigation,
    },
}
</script>