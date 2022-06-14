import { createStore } from "vuex";

const store = createStore({
  state: {
    user: {
      data: { role: "ADMIN" },
      token: null,
    },
  },
  getters: {},
  actions: {},
  mutations: {},
  modules: {},
});

export default store;
