<template>
    <div class="mb-4" v-if="!getToken">
      <p class="text-center text-white mt-2 pt-4">Necesitas entrar para poder escribir en el chat.</p>
      <a href="https://api-aura.armortemplate.com/auth/google"
        class="flex items-center px-4 py-2  bg-white text-gray-700 font-medium border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500  m-auto mt-2 mb-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/48px-Google_%22G%22_logo.svg.png?20230822192911"
          alt="Google" class="w-5 h-5 mr-2 ">
        Entrar con Google
      </a>
      <!-- <button class="mt-4 w-full p-2 rounded bg-blue-500 text-white hover:bg-blue-600">
Iniciar Sesión
</button> -->
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Entrar",
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