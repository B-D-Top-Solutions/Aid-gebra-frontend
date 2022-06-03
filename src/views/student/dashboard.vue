<template>
    <Navigation/>
    <br/>
    <div class="container py-5">
        <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#code">
            Join classroom
        </button>

        <div class="d-grid grid-gap2 grid-item-card">
            <!-- cards -->
            
            <RouterLink to="/student/classroom" class="text-decoration-none border rounded p-3 align-items-center bg-light">
                <h3 class="text-muted text-center my-5">Class #1323</h3>
                <small class="d-block text-center">Anna marie</small>
            </RouterLink>
            <RouterLink to="/student/classroom" class="text-decoration-none border rounded p-3 align-items-center bg-light">
                <h3 class="text-muted text-center my-5">Class #1323</h3>
                <small class="d-block text-center">Anna marie</small>
            </RouterLink>
            <RouterLink to="/student/classroom" class="text-decoration-none border rounded p-3 align-items-center bg-light">
                <h3 class="text-muted text-center my-5">Class #1323</h3>
                <small class="d-block text-center">Anna marie</small>
            </RouterLink>
            <RouterLink to="/student/classroom" class="text-decoration-none border rounded p-3 align-items-center bg-light">
                <h3 class="text-muted text-center my-5">Class #1323</h3>
                <small class="d-block text-center">Anna marie</small>
            </RouterLink>
        </div>
    </div>

    <div class="modal fade" id="code" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <input type="text" class="form-control" placeholder="Classroom code :"/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn text-light bg-main">JOIN</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '../../components/students/navigation.vue'

export default {
    name : 'Dashboard',
    components : {
        Navigation,
    },
}
</script>