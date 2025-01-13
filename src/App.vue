<template>
  <div id="app">
    <!-- {{ getToken }} -->
    <!-- {{ getRole }} -->
    <!--  Nuevo Header -->



    <!-- Nuevo Header Finish -->

    <!-- <nav class="bg-purple-500" v-if="getToken">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <h1 class="text-white font-bold text-lg ">Aura Productora</h1>
        <div class="flex space-x-4">
          <router-link to="/" class="bg-white text-purple-500 px-4 py-2 rounded-lg">
            <i class="fas fa-qrcode"></i> Escanear
          </router-link>
          <button @click="$store.dispatch('logout')" class="bg-white text-purple-500 px-4 py-2 rounded-lg">

            <i class="fas fa-sign-out-alt"></i> Salir
          </button>
        </div>
      </div>
    </nav> -->

    <!-- <nav class="bg-purple-500" v-if="getToken">
      <div class="d-block mt-4">
        <h1 class="text-2xl font-bold text-white ">AURA PRODUCTORA</h1>
        <p class="bg-green-500 p-2 rounded text-black" v-if="getRole === 'admin'">ADMIN</p>
        <p class="bg-blue-500 p-2 rounded text-white" v-if="getRole === 'entrada'">ENTRADA</p>
        <p class="bg-red-500 p-2 rounded" v-if="getRole === 'barra'">BARRA</p>

      </div>
      <div class="mt-4">

        <router-link v-if="getRole === 'entrada' || getRole === 'admin'" to="/"
          class="uppercase bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">QR
          ENTRADA</router-link>
        <router-link v-if="getRole === 'barra' || getRole === 'admin'" to="/barra"
          class="ml-4 uppercase bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">QR BARRA</router-link>
        <button class="ml-4 uppercase bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
          @click="$store.dispatch('logout')">Salir</button>

      </div>
    </nav> -->
    <router-view class="min-h-screen" />
   
  
  </div>
</template>
<script>
import Login from "./components/Login.vue";
export default {
  data() {
    return {
      token: false,
      isMenuVisible: false,
      // scaner
    };
  },
  mounted() {
  // this.$store.dispatch("checkToken");
  },

  components: {
    Login,
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken;
    },
    getRole() {
      return this.$store.getters.getUser;
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
