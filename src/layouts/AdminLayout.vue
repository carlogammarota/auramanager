<template>
    <div>
        
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
          <router-link to="/comprar" 
          class="bg-green-500 hover:bg-green-700 text-white font-bold px-4 mb-2 md:mb-0 rounded-lg flex items-center space-x-2">
          <i class="fas fa-qrcode text-xl"></i>
          <span class="text-sm">Sitio de Compra</span>
        </router-link>
        <router-link
          to="/admin/entrada"
          style="background: #221274"
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold px-4 rounded-lg flex items-center space-x-2"
        >
          <i class="fas fa-qrcode text-xl"></i>
          <span class="text-sm">Administracion Entrada</span>
        </router-link>
        <router-link
          to="/admin/publicas"
          style="background: #221274"
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold px-4 rounded-lg flex items-center space-x-2"
        >
          <i class="fas fa-person text-xl"></i>
          <span class="text-sm">Publicas</span>
        </router-link>
        <router-link
          to="/"
          class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold px-4 rounded-lg flex items-center space-x-2 py-1"
        >
          <!-- <i class="fas fa-times-circle text-xl"></i> -->
          <span class="text-sm">Radio</span>
        </router-link>
        <router-link
          to="/admin/barra"
          style="background: #221274"
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold px-4 rounded-lg flex items-center space-x-2 py-1"
        >
          <!-- <i class="fas fa-times-circle text-xl"></i> -->
          <span class="text-sm">Barra</span>
        </router-link>
        <!-- <router-link
          to="/entrada"
          style="background: #221274"
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold px-4 rounded-lg flex items-center space-x-2"
        >
          <span class="text-sm">Entrada</span>
        </router-link> -->

        <!-- <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 md:bg-transparent md:text-gray-700 md:p-0">Productos</a> -->
        <button
          @click="$store.dispatch('logout')"
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 md:bg-transparent md:text-gray-700 md:p-0"
        >
          <i class="fas fa-sign-out-alt mr-2"></i> <span class="">Salir</span>
        </button>
        <!-- <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 md:bg-transparent md:text-gray-700 md:p-0">Contacto</a> -->
      </nav>
    </header>
      <main>
        <router-view />
      </main>

      <footer
    class="bg-purple-900 py-4 sm:py-8 md:py-6 text-gray-300"
  >
    <div class="container mx-auto px-4">
      <!-- Sección de contenido en dispositivos móviles -->
      <div class="flex flex-col sm:flex-row justify-between items-center">
        <p class="text-center sm:text-left text-sm sm:text-base mb-4 sm:mb-0">
          &copy; 2025
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
  import Login from "../components/Login.vue";
  import { mapGetters } from "vuex";
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
    ...mapGetters(['getUser', 'getTokenString'])
    },
  };
  </script>