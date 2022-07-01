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
  <div class="rounded bg-light p-3 text-center mb-3">
        The following lesson outline was constructed in line with the Department of Education Curriculum Guide and Learning Modules for Grade 7 Mathematics. This is composed of seven (7) lessons with five (5) concepts each.
  </div>

  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(500px,1fr)); grid-gap:15px">
    <div class="p-3 bg-light rounded ">
        <h3 style="background-color:#ADEFD1" class="p-3">LESSON 1: ALGEBRAIC EXPRESSION</h3>
        <br/>
        <p>Concept 1:  Definition of Terms in Algebra</p>
        <p>Concept 2: Concept of Terms</p>
        <p>Concept 3: Concept of Degree</p>
        <p>Concept 4: Polynomials and Its Standard Form</p>
        <p>Concept 5: Kinds of Polynomials </p>
    </div>
    <div class="p-3 bg-light rounded ">
        <h3 style="background-color:#ADEFD1" class="p-3">LESSON 2: VERBAL EXPRESSION AND NUMERICAL EXPRESSIONS</h3>
        <br/>
        <p>Concept 1: Mathematical Symbols and Phrases</p>
        <p>Concept 2: Translation of Mathematical Phrases to Numerical Expressions</p>
        <p>Concept 3: Translation of Mathematical Phrases with “=” Sign</p>
        <p>Concept 4: Translation of Numerical Expressions to Mathematical Phrases</p>
        <p>Concept 5: Translation of Mathematical Phrases Involving Word Problems</p>
    </div>
    <div class="p-3 bg-light rounded ">
        <h3 style="background-color:#ADEFD1" class="p-3">LESSON 3: EVALUATING ALGEBRAIC EXPRESSIONS, ADDITION OF POLYNOMIALS, AND SUBTRACTION OF POLYNOMMIALS</h3>
        <br/>
        <p>Concept 1:  Definition of Terms in Algebra</p>
        <p>Concept 2: Concept of Terms</p>
        <p>Concept 3: Concept of Degree</p>
        <p>Concept 4: Polynomials and Its Standard Form</p>
        <p>Concept 5: Kinds of Polynomials </p>
    </div>
    <div class="p-3 bg-light rounded ">
        <h3 style="background-color:#ADEFD1" class="p-3">LESSON 4: LAWS OF EXPONENTS</h3>
        <br/>
        <p>Concept 1: n Times: a^n</p>
        <p>Concept 2: Power of Powers: (a^n)^m </p>
        <p>Concept 3: Product of a Power: (a^n)(a^m)</p>
        <p>Concept 4: Quotient of a Power (a^n)/(a^m)</p>
        <p>Concept 5: Laws for Zero Exponent and for Negative Exponent</p>
    </div>
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