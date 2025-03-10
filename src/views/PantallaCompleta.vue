<template>
    <div class="relative w-full h-screen bg-black">
      <!-- Video -->
      <video controls crossorigin playsinline class="w-full h-full object-cover">
        <source type="application/x-mpegURL" src="https://live.auraproducciones.lat/stream/hls/playlist.m3u8">
      </video>
  
      <!-- Chat en vivo -->
      <div v-if="isChatVisible" class="absolute top-0 right-0 w-80 h-full bg-gray-900 bg-opacity-90 text-white flex flex-col shadow-lg">
        <div class="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 class="text-lg font-semibold">Chat en Vivo</h2>
          <button @click="toggleChat" class="text-gray-400 hover:text-white">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        <div class="flex-1 p-4 overflow-y-auto space-y-2">
          <chat></chat>
          <div v-for="(message, index) in messages" :key="index" class="bg-gray-800 p-2 rounded hidden">
            <p class="text-sm font-semibold">{{ message.user }}</p>
            <p class="text-sm">{{ message.text }}</p>
          </div>
        </div>
        <div class="p-4 border-t border-gray-700 flex">
          <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Escribe un mensaje..." class="flex-1 p-2 bg-gray-700 text-white rounded outline-none">
          <button @click="sendMessage" class="ml-2 text-blue-400 hover:text-blue-600">
            <i class="fas fa-paper-plane text-xl"></i>
          </button>
        </div>
      </div>
  
      <!-- Botón para mostrar/ocultar el chat -->
      <button v-if="!isChatVisible" @click="toggleChat" class="absolute top-4 right-4 bg-gray-800 bg-opacity-75 text-white p-2 rounded-full shadow-md hover:bg-gray-700">
        <i class="fas fa-comments text-xl"></i>
      </button>
    </div>
  </template>
  
  <script>
  import chat from '@/components/Chat.vue';
  export default {
    data() {
      return {
        isChatVisible: false,
        messages: [
          { user: 'DJ Alex', text: '¡Saludos desde Argentina!' },
          { user: 'María', text: 'Gran sesión de música 🎶🔥' }
        ],
        newMessage: ''
      };
    },
    methods: {
      toggleChat() {
        this.isChatVisible = !this.isChatVisible;
      },
      sendMessage() {
        if (this.newMessage.trim() !== '') {
          this.messages.push({ user: 'Tú', text: this.newMessage });
          this.newMessage = '';
        }
      }
    },
    components: {
      chat
    }
  };
  </script>
  
  <style>
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 3px;
  }
  </style>
  