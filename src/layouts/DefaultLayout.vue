<template>
  <div>
    <!-- Navbar -->
    <nav class="bg-gray-800 p-4 flex justify-between items-center flex-wrap mx-auto">

      <!-- Logo y Nombre -->
      <div class="flex items-center space-x-2 text-2xl font-bold">
        <img src="../assets/auraBlanco.png" class="w-32" alt="Profile Picture">
      </div>

      <!-- Menu de navegación para escritorio -->
      <div class="hidden md:flex items-center space-x-6">
        <!-- Dropdown para opciones de usuario -->
        <div class="relative">
          <button class="text-white font-medium" @click="toggleDropdown">
            Opciones <i class="fas fa-caret-down"></i>
          </button>
          <div v-if="dropdownVisible" class="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg">
            <router-link to="/ruta1" class="block py-2 px-4 text-white">Opción 1</router-link>
            <router-link to="/ruta2" class="block py-2 px-4 text-white">Opción 2</router-link>
            <button @click="logout" class="block py-2 px-4 text-red-500">Salir</button>
          </div>
        </div>
      </div>

      <!-- Icono de menú para pantallas pequeñas (mobile) -->
      <div class="md:hidden">
        <button @click="toggleMobileMenu" class="text-white focus:outline-none">
          <i class="fas fa-bars text-2xl"></i>
        </button>
      </div>
    </nav>

    <!-- Menú para pantallas pequeñas (mobile) -->
    <div v-show="mobileMenuVisible" id="mobileMenu" class="w-full flex-col items-center space-y-4 p-4 bg-gray-800 text-white md:hidden">
      <div class="flex justify-between items-center w-full">
        <p class="text-lg font-medium">{{ getUser ? getUser.name : 'Invitado' }}</p>
        <button @click="logout" class="text-red-500">Salir</button>
      </div>
      <router-link to="/ruta1" class="block py-2 text-white">Opción 1</router-link>
      <router-link to="/ruta2" class="block py-2 text-white">Opción 2</router-link>
    </div>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SiteLayout",
  data() {
    return {
      mobileMenuVisible: false,
      dropdownVisible: false
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken;
    },
    getUser() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    ...mapActions(['logout']),
    toggleMobileMenu() {
      this.mobileMenuVisible = !this.mobileMenuVisible;
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    }
  }
};
</script>

<style scoped>
/* Estilos específicos del layout site */
#mobileMenu {
  display: flex;
  flex-direction: column;
}

#mobileMenu a {
  text-decoration: none;
  padding: 10px;
  color: white;
  border-bottom: 1px solid #fff;
}

#mobileMenu a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
