<template>
  <div class="p-3 bg-main position-sticky shadow top-0">
    <div class="container d-flex justify-content-between align-items-center">
      <section>
        <RouterLink to="/" class="text-decoration-none">
          <img
            class="w-100 px-auto mx-2"
            src="/src/assets/images/logo.png"
            style="max-width: 150px"
          />
        </RouterLink>
        <RouterLink
          to="/admin/dashboard"
          class="text-decoration-none text-white border-bottom ml-4"
          >Dashboard</RouterLink
        >&nbsp;
        <RouterLink
          :to="{ name: 'admin-classes' }"
          class="text-decoration-none text-white border-bottom"
          >Classrooms</RouterLink
        >&nbsp;
        <RouterLink
          :to="{ name: 'admin-lessons' }"
          class="text-decoration-none text-white border-bottom"
          >Lessons</RouterLink
        >&nbsp;
        <RouterLink
          to="/admin/monitoring"
          class="text-decoration-none text-white border-bottom"
          >Monitoring</RouterLink
        >
      </section>

      <section>
        <div class="flex-fill d-flex justify-content-end align-items-center">
          <div
            class="rounded-circle overflow-hidden border me-3"
            style="height: 50px; width: 50px"
          >
            <img v-if="avatar" :src="`${avatar}`" class="d-block w-100" />
          </div>
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
                  :to="{ name: 'admin-profile' }"
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
<script setup>
import store from "../../store";
import { useRouter } from "vue-router";

const router = useRouter();
const avatar =
  import.meta.env.VITE_SERVER + "/" + store.state.user.data.avatar[0]?.path;

function logout() {
  store.dispatch("logout").then((data) => {
    router.push({
      name: "index",
    });
  });
}
</script>
