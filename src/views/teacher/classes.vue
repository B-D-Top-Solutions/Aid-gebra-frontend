<template>
    <Navigation/>
    <br/>
    <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="input-group" style="width:300px">
                <input type="text" class="form-control" placeholder="What are you looking for ?">
                <button class="btn btn-outline-secondary" type="button"><i class="bi bi-search text-maincolor"></i></button>
            </div>

            <button class="btn btn-light border shadow-sm" data-bs-toggle="modal" data-bs-target="#class_modal"><i class="bi bi-plus"></i>&nbsp;Create class</button>
        </div>
        <br/>
        <table class="table caption-top">
            <caption>List of classes</caption>
            <thead style="border:none">
                <tr class="bg-main">
                    <th class="text-light">Code</th>
                    <th class="text-light">Name</th>
                    <th class="text-light" style="max-width:150px">Status</th>
                    <th class="text-light" style="max-width:150px">-</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><small>GM34K2</small></td>
                    <td><small>Mental Maths</small></td>
                    <td><span class="badge bg-success">Active</span></td>
                    <td><button class="shadow-sm btn btn-sm bg-main text-light">Deactivate</button></td>
                </tr>
            </tbody>
        </table>
        
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-secondary">Prev</button>
            <button type="button" class="btn btn-outline-secondary">1</button>
            <button type="button" class="btn btn-outline-secondary">Next</button>
        </div>
    </div>
    
    <div class="modal fade" id="class_modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <input type="hidden" />
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
                        <label for="floatingInput">Class Name</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn text-light bg-main">Save</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import Navigation from '../../components/teacher/navigation.vue'

export default {
    name : 'teacher-classes',
    components : {
        Navigation,
    },
}
</script>