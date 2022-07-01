<template>

<div class="w-100 bg-light p-3 mb-4">
    <div class="d-flex justify-content-between align-items-center">
        <span>
        <RouterLink to="/login" class="text-decoration-none fw-bolder text-dark me-3">Login</RouterLink>
        <RouterLink to="/register" class="text-decoration-none fw-bolder text-dark">Sign up</RouterLink>
        </span>
        <span>
        <img
          v-if="desktop.show"
            class="d-block w-100 mx-auto"
            src="/src/assets/images/logo.png"
            style="max-width: 200px"
        />
        </span>
        <span>
        <RouterLink to="/lessons" class="text-decoration-none fw-bolder text-dark me-3">Lessons</RouterLink>
        <RouterLink to="/about" class="text-decoration-none fw-bolder text-dark">About Us</RouterLink>
        </span>
    </div>
</div>

<div class="container mt-5">
  <!-- <div class="p-5" style="background-image:url('/src/assets/images/bg.png');background-size:cover;"> -->
  <div class="p-5" style="background-color:#ADEFD1">
    <h1 class="mb-3">About Us</h1>
    <p>
        AidGebra is an adaptive learning system designed to help Filipino Grade 7 students to learn and master Algebra fundamentals. 
        <br/><br/>
        This website offers a hierarchical structure with examinations, assessments, and learning materials aligned with DepEd's Curriculum and Most Essential Learning Competencies for Grade 7 Algebra. With the incorporation of fuzzy logic and decision tree algorithms, the system is able to take into account learner's knowledge level and provide an appropriate learning experience.
        <br/><br/>
        Teachers and admins can monitor their students' learning progress and give support as necessary through having classrooms for their students.
        <br/><br/>
        Ensure mastery of Grade 7 Algebra with AidGebra!
        <br/><br/>
        For questions or concerns, you may contact us at aidgebra.als@gmail.com
    </p>
  </div>
</div>

</template>

<script>
export default {
    name : 'index',
    data(){
        return {
            desktop : {
              show : true
            }
        }
    },
    methods :{
        r (condition) {
            console.log(condition)
            if(condition == true){
              this.desktop.show = false 
            }
            else{
              this.desktop.show = true
            }
        }
    },
    created() {

        this.r(window.matchMedia('(max-width: 600px)').matches)

        window.addEventListener('resize',(e) => {
            this.r(window.innerWidth <= 600)
        })
    }
}
</script>