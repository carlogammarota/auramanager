import Vue from "vue";
import Vuex from "vuex";
import store from "./index";
import createPersistedState from "vuex-plugin-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: false,
    token_string: "token",
    user: {
      permissions: ["otro"]
    },
    role: null,
    
  },
  getters: {
    getToken: state => {
      return state.token;
    },
    getTokenString: state => {
      return state.token_string;
    },
    getUser: state => {
      
      // return state.user.permissions[0];
      if(state.user.permissions){
        return state.user.permissions[0];
      } else {
        return null;
      }

    },
    getRole: state => {
      return state.user.role;
    }
  },
  mutations: {
    setToken(state, token) {

      state.token = true;
      state.token_string = token;
    },
    setUser(state, user) {
      state.user = user;
      //  "permissions": [ "admin" ] 
      //recorrer permissions y asignar el rol
      // state.role = user.permissions
      

    },
    
    // clearToken(state) {
    //   state.token = false;
    //   state.token_string = "token";
     
    // },
    logout: (state) => {
      state.token_string = "token",
      state.token = false // Only in my setup remove session token
      state.isUserLoggedIn = false // this will trigger the vue-persist-store plugin to set all state to empty on the location relaod

  },

  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },

    async logout ({ commit }) {    
      commit('logout') 
      localStorage.removeItem('vuex');
      // location.reload()  
    },
    //set user
    async setUser({ commit }, user) {
      commit("setUser", user);
    }
      
  },
  modules: {},
  plugins: [createPersistedState({
              key: 'vuex',    
            })]
});
