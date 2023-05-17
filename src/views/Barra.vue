<template>
  <div class="barra">
    <!-- <h1 class="text-3xl">Entrada</h1> -->
    <div class="mx-8" v-if="getToken">
      <h1 @click="scaner = true" v-if="!scaner"
        class="text-3xl my-8 bg-base-400 p-2 border-2 border-black cursor-pointer">Escanear QR</h1>
      <!-- <button @click="scanQR">Escanear QR</button> -->
      <QrScaner v-if="scaner" />
      <h1 @click="scaner = false" v-if="scaner"
        class="text-2xl my-4 bg-base-400 p-2 border-2 border-black cursor-pointer">Cerrar Scaner</h1>

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
