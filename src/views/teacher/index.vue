<template>
    <div class="container py-5">
        <h1 class="text-maincolor text-center mb-5">Welcome Teacher!</h1>
        <center>
            <div style="max-width:450px">
                <div class="rounded border p-4">
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <RouterLink to="/admin/dashboard" class="d-block w-100 btn bg-main text-white mt-4">SIGN IN</RouterLink>
                </div>
                <br/>
                                <small class="d-flex">
                    <span class="text-muted">Don't have an account ? contact an admin or </span> &nbsp;
                    <RouterLink to="/teacher/register" class="text-decoration-none text-maincolor">
                        Register here.
                    </RouterLink>
                </small>
            </div>
        </center>
    </div>
</template>

<script>

</script>