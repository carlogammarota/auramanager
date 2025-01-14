<template>
    <div class="mt-4 mb-8 h-[400px] flex flex-col relative" style="height:400px">
      <!-- Contenedor del chat -->
      <div
        ref="chatContainer"
        class="bg-gray-800 p-4 rounded text-left flex-grow overflow-y-auto"
      >
        <h2 class="text-xl font-bold">Chat en Vivo</h2>
        <div class="mt-4 mb-24">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="flex items-start space-x-4 mb-4"
          >
            <!-- Imagen de perfil -->
            <img
              :src="msg.user.imagen"
              class="w-10 h-10 rounded-full mt-2"
              v-if="msg.user.imagen"
              alt="Profile Picture"
            />
            <i class="fas fa-user-circle text-2xl mt-2" v-else></i>
            <div>
              <h3 class="font-bold">{{ msg.user.name }}</h3>
              <p>{{ msg.text }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Barra de input fija al fondo del contenedor -->
      <div
        v-if="getUser.name"
        class="absolute bottom-0 left-0 w-full bg-gray-900 p-4 flex items-center"
      >
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          v-model="message"
          @keydown.enter="sendMessage"
          class="flex-grow p-2 rounded border border-gray-600 bg-gray-800 text-white"
        />
        <button
          @click="sendMessage"
          class="ml-2 px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>
  
      <div v-else class="bg-gray-800 p-4 pt-0 pb-1 rounded">
        <Entrar></Entrar>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  import socket from "@/plugins/socket";
  import Entrar from "@/components/Entrar.vue";
  
  export default {
    name: "Chat",
    data() {
      return {
        message: "",
        messages: [],
      };
    },
    components: {
      Entrar,
    },
    computed: {
      ...mapGetters(["getUser", "getToken", "getTokenString"]),
    },
    created() {
      // Escucha mensajes entrantes
      socket.on("receiveMessage", (data) => {
        this.messages.push(data);
        this.scrollToBottom(); // Desplazar hacia abajo cuando se recibe un mensaje
      });
  
      socket.on("loadMessages", (data) => {
        this.messages = data;
        this.scrollToBottom(); // Desplazar hacia abajo cuando se recibe un mensaje
      });
    },
    methods: {
      sendMessage() {
        if (this.message.trim() === "") return;
        const user = this.getUser || "Anónimo";
        socket.emit("sendMessage", { user, text: this.message });
        this.message = ""; // Limpia el input
      },
      scrollToBottom() {
        // Desplazar el contenedor hacia abajo
        this.$nextTick(() => {
          const container = this.$refs.chatContainer;
          container.scrollTop = container.scrollHeight;
        });
      },
    },
  };
  </script>
  