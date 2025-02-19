import Vue from "vue";
import Vuex from "vuex";
import store from "./index";
import createPersistedState from "vuex-plugin-persistedstate";
import router from '@/router'; // Asegúrate de que el archivo sea correcto

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: false,
    token_string: "",
    user: {
      permissions: ["otro"]
    },
    role: 'otro',
    
  },
  getters: {
    getToken: state => {
      return state.token;
    },
    getTokenString: state => {
      return state.token_string;
    },
    getUser: state => {
      
      return state.user.permissions[0];
      // if(state.user.permissions){
      //   return state.user.permissions[0];
      // } else {
      //   return null;
      // }

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
      state.token_string = "",
      state.token = false // Only in my setup remove session token
      state.isUserLoggedIn = false // this will trigger the vue-persist-store plugin to set all state to empty on the location relaod
      router.push("/login")


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
    },
    checkToken({ commit }) {
      console.log("checkToken");
      const token = store.getters.getTokenString
      console.log(token);
      if (token) {
        commit("setToken", token);
      } else {
        //redirect to login

        //si la ruta es comprar, no redirigir
        
        if(router.currentRoute.name != 'comprar'){
          router.push('/login');  
        }
        // router.push('/login');  
        console.log("no hay token");
      }
    }
  },
  modules: {},
  plugins: [createPersistedState({
              key: 'vuex',    
            })]
});
