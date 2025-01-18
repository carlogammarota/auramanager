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
      _id: null,
      permissions: null,
    },
    role: 'otro',
    
  },
  getters: {
    getUser(state) {
      //si no hay usuario ni token devolver null
      if (!state.user || !state.token) {
        return null;
      }
      return state.user; // Devuelve el usuario desde el estado
    },
    getToken: state => {
      return state.token;
    },
    getTokenString: state => {
      return state.token_string;
    },
    getUser: state => {
      
      return state.user;
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
    setUserId(state, userId) {
      state.user._id = userId; // Actualiza el "_id" del usuario en el estado
    },
    // setToken(state, token) {
    //   state.token = token; // Actualiza el token en el estado
    // },
    setToken(state, token) {
      
      state.token = true;
      state.token_string = token;
      console.log("setToken", state.token_string);
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
      router.push("/")


  },

  },
  actions: {
    deleteToken({ commit }) {
      commit("deleteToken"); // Llama a la mutación para eliminar el token
    },
    deleteUser({ commit }) {
      commit("deleteUser"); // Llama a la mutación para eliminar el token
    },
    saveUser({ commit }, user) {
      commit("setUser", user); // Llama a la mutación para guardar el usuario en el estado
    },
    saveToken({ commit }, token) {
      console.log("saveToken");
      commit("setToken", token); // Llama a la mutación para guardar el token en el estado
    },
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
      console.log("checkToken ejecutado");

      //ignorar
      return;
    
      // Obtener el token usando el getter del store
      const token = store.getters.getTokenString;
      console.log("Token obtenido:", token);
    
      if (token) {
        // Si hay token, actualizamos el estado con el commit
        commit("setToken", token);
      } else {
        console.log("No hay token");
    
        // Verificar la ruta actual antes de redirigir
        const currentRouteName = router.currentRoute.name;
    
        // No redirigir si estás en la ruta "comprar" o cualquier otra pública
        if (currentRouteName !== "comprar" && currentRouteName !== "radio") {
          console.log("Redirigiendo a login");
          router.push("/login");
        } else {
          console.log("Permaneciendo en la ruta actual:", currentRouteName);
        }
      }
    }
    
  },
  modules: {},
  plugins: [createPersistedState({
              key: 'vuex',    
            })]
});
