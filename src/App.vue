<template>
  <div id="app">
    <!-- {{ getToken }} -->
    <!-- {{ getRole }} -->
    <!--  Nuevo Header -->

    <header
      class="bg-gray-100 p-4 flex justify-between items-center"
      v-if="getToken"
    >
      <div class="flex items-center">
        <img src="@/assets/logo.png" alt="Logo" class="h-16 mr-2" />
        <!-- <span class="font-semibold">Aura</span> -->
      </div>
      <button @click="isMenuVisible = !isMenuVisible" class="md:hidden">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      <nav
        :class="{ hidden: !isMenuVisible }"
        class="md:flex md:items-center md:gap-4"
      >
        <!-- <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 md:bg-transparent md:text-gray-700 md:p-0">Inicio</a> -->
        <!-- <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 md:bg-transparent md:text-gray-700 md:p-0">Servicios</a> -->
        <!-- <router-link to="/entrada" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 md:bg-transparent md:text-gray-700 md:p-0 ">
            <i class="fas fa-qrcode mr-2"></i> Entrada
          </router-link> -->

        <router-link
          to="/entrada"
          style="background: #221274"
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold px-4 rounded-lg flex items-center space-x-2"
        >
          <i class="fas fa-qrcode text-xl"></i>
          <span class="text-sm">Escanear QR</span>
        </router-link>
        <router-link
          to="/barra"
          style="background: #221274"
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold px-4 rounded-lg flex items-center space-x-2"
        >
          <!-- <i class="fas fa-times-circle text-xl"></i> -->
          <span class="text-sm">Barra</span>
        </router-link>
        <router-link
          to="/entrada"
          style="background: #221274"
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold px-4 rounded-lg flex items-center space-x-2"
        >
          <!-- <i class="fas fa-times-circle text-xl"></i> -->
          <span class="text-sm">Entrada</span>
        </router-link>

        <!-- <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 md:bg-transparent md:text-gray-700 md:p-0">Productos</a> -->
        <button
          @click="$store.dispatch('logout')"
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 md:bg-transparent md:text-gray-700 md:p-0"
        >
          <i class="fas fa-sign-out-alt mr-2"></i> Salir
        </button>
        <!-- <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 md:bg-transparent md:text-gray-700 md:p-0">Contacto</a> -->
      </nav>
    </header>

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
    <footer
    class="bg-purple-900 py-4 sm:py-8 md:py-6 text-gray-300"
    v-if="getToken"
  >
    <div class="container mx-auto px-4">
      <!-- Sección de contenido en dispositivos móviles -->
      <div class="flex flex-col sm:flex-row justify-between items-center">
        <p class="text-center sm:text-left text-sm sm:text-base mb-4 sm:mb-0">
          &copy; 2023
          <a
            href="http://aura-producciones.com/"
            class="hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aura Producciones
          </a>
          . Todos los derechos reservados.
        </p>
  
        <!-- Redes sociales (puedes descomentar si las usas) -->
        <!-- <ul class="flex space-x-4">
          <li>
            <a href="#"><i class="fab fa-facebook-f text-gray-300"></i></a>
          </li>
          <li>
            <a href="#"><i class="fab fa-twitter text-gray-300"></i></a>
          </li>
          <li>
            <a href="#"><i class="fab fa-instagram text-gray-300"></i></a>
          </li>
        </ul> -->
      </div>
    </div>
  </footer>
  
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
  this.$store.dispatch("checkToken");
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
