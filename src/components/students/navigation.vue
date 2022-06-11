<template>
    <div class="p-3 bg-main position-sticky shadow top-0">
        <div class="container d-flex justify-content-between align-items-center">
            <section>
                <RouterLink to="/student/dashboard" class="text-decoration-none text-white border-bottom">Classrooms</RouterLink>&nbsp;
                <!-- <RouterLink to="/student/scores" class="text-decoration-none text-white border-bottom">Scores</RouterLink> -->
            </section>

            <section>
                <div class="flex-fill d-flex justify-content-end align-items-center">
                    <div class="rounded-circle overflow-hidden border me-3" style="height:50px;width:50px;">
                        <!-- <img v-if="img" :src="`${img}`" class="d-block w-100"/> -->
                    </div>
                    <div class="dropdown">
                        <div class="dropdown-toggle text-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <small>My Account &nbsp;</small>
                        </div>
                        <ul class="dropdown-menu">
                            <li>
                                <RouterLink to="/student/profile" class="dropdown-item btn btn-outline-danger">Profile</RouterLink>
                            </li>
                            <li>
                                <button @click="logout()" class="dropdown-item btn btn-outline-danger">Sign out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import auth from '../../utils/authHeader'

export default {
    name : 'student-header',
    methods : {
        logout () {
            localStorage.removeItem("student-token")
            auth("student")
            this.$router.push("/student")
        }
    }
}
</script>