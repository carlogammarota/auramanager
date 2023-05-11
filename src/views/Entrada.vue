<template>
  <div class="home">
    <!-- <h1 class="text-3xl">Entrada</h1> -->
    <div class="mx-8">
								<h1 @click="scaner = true" v-if="!scaner" class="text-3xl my-8 bg-base-400 p-2 border-2 border-black cursor-pointer">Escanear QR</h1>
								<!-- <button @click="scanQR">Escanear QR</button> -->
								<QrScaner v-if="scaner" />
								<h1 @click="scaner = false" v-if="scaner" class="text-2xl my-4 bg-base-400 p-2 border-2 border-black cursor-pointer">Cerrar Scaner</h1>
	
						</div>
            
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
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
    QrScaner
  },
};
</script>
