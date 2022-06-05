<template>
    <Navigation/>
    <br/>
    <div class="container py-5">
        <h1>Admin Profile</h1>
        <div class="d-flex mt-3 justify-content-between">
            <section class="flex-fill me-3" style="max-width:500px">
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput1" placeholder="Fullname">
                    <label for="floatingInput1">Fullname</label>
                </div>
                <button class="d-block btn bg-main text-white mt-4">Save changes</button>
                <hr>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword1" placeholder="Confirm Password">
                    <label for="floatingPassword1">Confirm Password</label>
                </div>
                <button class="d-block btn bg-main text-white mt-4">Change password</button>
            </section>
        </div>
    </div>
</template>

<script>
import Navigation from '../../components/admin/navigation.vue'

export default {
    name : 'admin-profile',
    components : {
        Navigation,
    },
}
</script>