<template>
  <div class="home">
    <!-- <h1 class="text-3xl">Entrada</h1> -->
    <!-- {{ getRole }} -->


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



    <!-- <div class="mx-8" v-if="getToken && false">
      <h1 @click="scaner = true" v-if="!scaner"
        class="text-3xl my-8 bg-base-400 p-2 border-2 border-black cursor-pointer">Escanear QR</h1>
      <QrScaner v-if="scaner" />
      <h1 @click="scaner = false" v-if="scaner"
        class="text-2xl my-4 bg-base-400 p-2 border-2 border-black cursor-pointer">Cerrar Scaner</h1>

    </div> -->


    <noAuth />



  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import noAuth from '@/components/noAuth.vue'
import QrScaner from '@/components/QrScaner.vue'

export default {
  name: "HomeView",
  data() {
    return {
      scaner: false
    };
  },
  components: {
    // HelloWorld,
    QrScaner,
    noAuth
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken
    },
    getRole() {
      return this.$store.getters.getUser

    },
    // getRole() {
    //   return this.$store.getters.getRole
    // },
  }

};
</script>
