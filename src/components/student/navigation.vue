<template>
  <div class="p-3 bg-main position-sticky shadow top-0" style="z-index: 10">
    <div :class="`container d-flex justify-content-between align-items-center ${desktop.show ? '' : 'flex-column'}`">
      <section>
        <img
          :class="`d-block w-100 mx-auto ${desktop.show ? '' : 'mb-3'}`"
          src="/src/assets/images/logo_dark.png"
          style="max-width: 200px"
        />
      </section>

      <section class="d-flex align-items-center">
        <RouterLink
          :to="{ name: 'student-dashboard' }"
          class="text-decoration-none text-white border-bottom me-3"
          >Dashboard</RouterLink
        >&nbsp;
        <RouterLink
          :to="{ name: 'student-myclass' }"
          class="text-decoration-none text-white border-bottom me-3"
          >Classroom</RouterLink
        >
        &nbsp;
        <RouterLink
          :to="{ name: 'student-myprogress' }"
          class="text-decoration-none text-white border-bottom me-3"
          >Scores</RouterLink
        >&nbsp;
        <div class="d-flex justify-content-end align-items-center">
          <div class="dropdown">
            <div
              class="dropdown-toggle text-light"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <small>My Account &nbsp;</small>
            </div>
            <ul class="dropdown-menu">
              <li>
                <RouterLink
                  :to="{ name: 'student-profile' }"
                  class="dropdown-item btn btn-outline-danger"
                  >Profile</RouterLink
                >
              </li>
              <li>
                <button
                  @click="logout()"
                  class="dropdown-item btn btn-outline-danger"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>


<script>

export default {
  name: "student-navigation",
  components: {},
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
};
</script>

<script setup>
import store from "../../store";
import { useRouter } from "vue-router";

const router = useRouter();
let avatar = "/src/assets/images/user128x128.png";

if (store.state.user.data.avatar[0]?.path != null) {
  avatar =
    import.meta.env.VITE_SERVER + "/" + store.state.user.data.avatar[0]?.path;
}

function logout() {
  store.dispatch("logout").then((data) => {
    router.push({
      name: "index",
    });
  });
}
</script>
