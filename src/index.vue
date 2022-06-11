<template>
    <div class="container d-flex justify-content-center flex-column align-items-center">
        <h1 class="text-center display-6 text-maincolor my-5">Welcome back!</h1>
        <div class="d-grid grid-gap3" style="max-width:350px;width:100%;">
            <RouterLink to="/admin" class="border-hover text-center border border-maincolor text-decoration-none bg-light border-maincolor rounded main-hover p-5 fw-bolder text-maincolor">
                ADMIN
            </RouterLink>
            <RouterLink to="/teacher" class="border-hover text-center border border-maincolor text-decoration-none bg-light border-maincolor rounded main-hover p-5 fw-bolder text-maincolor">
                TEACHER
            </RouterLink>
            <RouterLink to="/student" class="border-hover text-center border border-maincolor text-decoration-none bg-light border-maincolor rounded main-hover p-5 fw-bolder text-maincolor">
                STUDENT
            </RouterLink>
        </div>
    </div>
</template>
