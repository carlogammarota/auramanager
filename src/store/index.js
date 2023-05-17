import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-plugin-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "token"
  },
  getters: {
    getToken: state => {
      return state.token;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    }
  },
  modules: {},
  plugins: [createPersistedState()]
});
