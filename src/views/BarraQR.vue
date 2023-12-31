<template>
  <div class="barra">
    <!-- <h1 class="text-3xl">Entrada</h1> -->

    <div class="flex flex-col h-screen justify-center items-center" v-if="getToken">
      <QrScaner v-if="scaner" />
      <button @click="scaner = true" v-if="!scaner"
        class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg flex items-center space-x-2">
        <i class="fas fa-qrcode text-xl"></i>
        <span class="text-xl">Escanear QR</span>
      </button>
      <button @click="scaner = false" v-if="scaner" style="z-index: 10000;"
        class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg flex items-center space-x-2 d-block">
        <i class="fas fa-times-circle text-xl"></i>
        <span class="text-xl">Cerrar Escáner</span>
      </button>
    </div>
    <noAuth />

  </div>
</template>
<script>
import QrScaner from '@/components/QrScaner.vue'
import noAuth from '@/components/noAuth.vue'

export default {
  name: "HomeView",
  data() {
    return {
      scaner: false
    };
  },
  components: {
    // HelloWorld,
    noAuth,
    QrScaner
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken
    }
  }

};
</script>
