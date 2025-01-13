<template>
    <div>
      <!-- Navbar -->
<nav class="bg-gray-800 p-4 flex justify-between items-center flex-wrap  mx-auto">
  <div class="flex items-center space-x-2 text-2xl font-bold">
    <img src="../assets/auraBlanco.png" class="w-32 " alt="Profile Picture">
    <!-- <span class="hidden sm:block" style="margin-bottom: 13px;">Aura Producciones</span> -->
  </div>

  <!-- Menu de navegación -->
  <div class="flex items-center space-x-4 sm:space-x-6">

    <!-- User Profile Login -->
    <div class="flex items-center space-x-3">
      <!-- {{ getUser }} -->
      <p class="text-lg font-medium text-white hidden md:block" >{{ getUser.name }}</p>
      <img :src="getUser.imagen" id="user_picture"
       class="w-10 h-10 rounded-full object-cover" alt="Profile Picture">
    </div>

    <!-- no login -->
    <div class="flex justify-center" v-if="!getToken">
      <div class="">
        <a href="https://api-aura.armortemplate.com/auth/google"
        class="flex items-center px-4 py-2 bg-white text-gray-700 font-medium border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/48px-Google_%22G%22_logo.svg.png?20230822192911"
          alt="Google" class="w-5 h-5 mr-2">
        Entrar con Google
      </a>
      </div>
    </div>

    <!-- Icono de menú para pantallas pequeñas -->
    <div class="sm:hidden">
      <button id="menuToggle" class="text-white focus:outline-none">
        <i class="fas fa-bars text-2xl"></i>
      </button>
    </div>
  </div>

  

  <!-- Menú desplegable para pantallas pequeñas -->
  <div id="mobileMenu"
    class="w-full hidden sm:hidden flex-col items-center space-y-4 p-4 bg-gray-800 text-white sm:hidden">
    <div class="flex items-center space-x-3">
      Menu
    </div>

  </div>
</nav>
      <main>
        
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
    import { mapGetters } from "vuex";
  export default {
    name: "SiteLayout",
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
  
  <style>
  /* Estilos específicos del layout site */
  </style>
  