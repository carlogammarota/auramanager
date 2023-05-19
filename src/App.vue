<template>
  <div id="app">
    <!-- {{ getToken }} -->
    <!-- {{ getRole }} -->
    <nav class="bg-purple-500" v-if="getToken">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <h1 class="text-white font-bold text-lg ">Aura Productora</h1>
        <div class="flex space-x-4">
          <h2 class="text-white font-semibold hidden md:block" v-if="getRole === 'entrada'">Entrada</h2>
          <h2 class="text-white font-semibold hidden md:block" v-if="getRole === 'admin'">Admin</h2>
          <h2 class="text-white font-semibold hidden md:block" v-if="getRole === 'barra'">Barra</h2>
          <router-link v-if="getRole === 'entrada' || getRole === 'admin'" to="/"
            class="bg-white text-purple-500 px-4 py-2 rounded-lg">
            <i class="fas fa-qrcode"></i> Entrada
          </router-link>
          <router-link v-if="getRole === 'barra' || getRole === 'admin'" to="/barra"
            class="bg-white text-purple-500 px-4 py-2 rounded-lg">
            <i class="fas fa-qrcode"></i> Entrada
          </router-link>
          <button @click="$store.dispatch('logout')" class="bg-white text-purple-500 px-4 py-2 rounded-lg">

            <i class="fas fa-sign-out-alt"></i> Salir
          </button>
        </div>
      </div>
    </nav>


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
    <router-view class="h-screen" />
    <footer class="bg-purple-900 py-4" v-if="getToken">
      <div class="container mx-auto px-4 text-center">
        <div class="flex justify-between items-center">
          <p class="text-gray-300">&copy; 2023 Aura Producciones. Todos los derechos reservados.</p>
          <!-- <ul class="flex space-x-4">
            <li><a href="#"><i class="fab fa-facebook-f text-gray-300"></i></a></li>
            <li><a href="#"><i class="fab fa-twitter text-gray-300"></i></a></li>
            <li><a href="#"><i class="fab fa-instagram text-gray-300"></i></a></li>
          </ul> -->
        </div>
      </div>
    </footer>

  </div>
</template>
<script>
import Login from './components/Login.vue'
export default {
  data() {
    return {
      token: false
    }
  },

  components: {
    Login
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken
    },
    getRole() {
      return this.$store.getters.getUser


    },
  }
}
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

nav a.router-link-exact-active {
  color: white;
  background-color: rgb(207, 77, 255) !important;
  border: solid 1px white;
}
</style>
