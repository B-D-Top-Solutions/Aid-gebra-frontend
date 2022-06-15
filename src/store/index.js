import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {
    user: {
      data: JSON.parse(sessionStorage.getItem("user")) || null,
      role: sessionStorage.getItem("role") || null,
      token: sessionStorage.getItem("token") || null,
    },
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      return axiosClient
        .post("/api/v2/auth/register", user)
        .then(({ data }) => {
          if (data.status == true) {
            commit("setUser", data);
          }
          return data;
        });
    },
    login({ commit }, user) {
      return axiosClient.post("/api/v2/auth/login", user).then(({ data }) => {
        if (data.status == true) commit("setUser", data);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/api/logout").then(({ data }) => {
        commit("logout");
      });
    },
  },
  mutations: {
    logout: (state) => {
      state.user.token = null;
      state.user.role = null;
      state.user.data = {};

      sessionStorage.removeItem("user");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("token");

      window.location.reload();
    },
    setUser: (state, user) => {
      state.user.token = user.token;
      state.user.role = user.role;
      state.user.data = user.data;

      sessionStorage.setItem("token", user.token);
      sessionStorage.setItem("role", user.role);
      sessionStorage.setItem("user", JSON.stringify(user.data));
    },
  },
  modules: {},
});

export default store;
