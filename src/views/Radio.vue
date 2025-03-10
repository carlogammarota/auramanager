<template>
    <div class="min-h-screen bg-gray-900 text-white font-sans overflow-hidden">
      <div class="container mx-auto p-4 md:p-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Section (Main Content) -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Banner with Parallax -->
            <div class="relative rounded-lg overflow-hidden">
              <div
                class="absolute inset-0 bg-cover bg-center parallax"
                :style="{ backgroundImage: `url('https://images2.alphacoders.com/135/thumb-1920-1355048.png')` }"
              ></div>
              <div class="relative z-10 p-6 bg-gray-900 bg-opacity-75">
                <BannerResolume />
              </div>
            </div>
  
            <!-- Live Set Info -->
            <div class="flex items-center justify-between mt-4">
              <h1 class="text-3xl md:text-4xl font-bold tracking-wide">
                Set Mauri D'Caria -
                <span class="text-blue-500">AR</span>
                <span class="text-red-500 animate-pulse"> EN VIVO </span>
                <span class="text-green-500">DESDE BRAZIL</span>
              </h1>
              <span
                class="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg animate-bounce"
              >
                LIVE
              </span>
            </div>
  
            <!-- Connected Users -->
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 class="text-xl font-semibold flex items-center space-x-3 text-purple-400">
                <i class="fas fa-users text-2xl"></i>
                <span>Usuarios Conectados: {{ usuarios_conectados }}</span>
              </h2>
            </div>
  
            <!-- Action Buttons -->
            <div class="flex space-x-6">
              <button
                class="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105 transition-all duration-300"
              >
                <i class="fas fa-thumbs-up"></i>
                <span>Me Gusta</span>
              </button>
              <button
                class="flex items-center space-x-2 px-4 py-2 bg-green-600 rounded-full hover:bg-green-700 hover:scale-105 transition-all duration-300"
              >
                <i class="fas fa-share"></i>
                <span>Compartir</span>
              </button>
            </div>
  
            <!-- Components -->
            <Usuarios />
            <Chat />
            <Grilla />
          </div>
  
          <!-- Right Section (Sidebar) -->
          <div class="space-y-6">
            <!-- Slogan -->
            <img
              src="../assets/slogan.png"
              alt="Slogan"
              class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
  
            <!-- YouTube Link -->
            <div
              class="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <i class="fab fa-youtube text-3xl text-white"></i>
              <a
                href="https://www.youtube.com/@auraproductora9208"
                target="_blank"
                class="text-xl font-semibold text-white hover:text-gray-200 transition"
              >
                YouTube Aura Producciones
              </a>
            </div>
  
            <!-- Call to Action -->
            <div
              class="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300"
            >
              <h2 class="text-2xl font-bold text-white mb-4 animate-fade-in">
                ¿Quieres salir en vivo en nuestra radio? 🎙️📻
              </h2>
              <p class="text-lg text-white mb-6 animate-fade-in-delay">
                ¡Hazlo ahora, envíanos un mensaje y te diremos cómo!
              </p>
              <a
                href="https://wa.me/543548546712"
                class="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 hover:scale-110 transition-all duration-300"
              >
                <i class="fab fa-whatsapp mr-2"></i> Enviar mensaje
              </a>
              <div class="mt-4">
                <a
                  href="https://wa.me/543548546712"
                  class="text-white hover:text-gray-300 transition"
                >
                  <i class="fas fa-info-circle mr-2"></i> Más información
                </a>
              </div>
            </div>
  
            <!-- Ticket Image -->
            <img
              src="https://i.postimg.cc/C1QVDNkw/Whats-App-Image-2025-03-09-at-12-37-10-PM.jpg"
              alt="Tickets"
              class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
  
            <!-- Sponsors -->
            <Patrocinar />
          </div>
        </div>
      </div>
  
      <!-- Hidden Maintenance Section -->
      <div class="flex items-center justify-center h-screen bg-gray-100 text-gray-800 text-center hidden">
        <div>
          <i class="fas fa-tools text-4xl text-red-500 mb-4"></i>
          <p class="text-3xl font-semibold">
            Estamos realizando pruebas de transmisión, sepá disculpar.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Entrar from "@/components/Entrar.vue";
  import { mapGetters } from "vuex";
  import socket from "@/plugins/socket";
  import Chat from "@/components/Chat.vue";
  import Patrocinar from "@/components/Patrocinar.vue";
  import Grilla from "@/components/Grilla.vue";
  import Usuarios from "@/components/Usuarios.vue";
  import BannerResolume from "@/components/BannerResolume.vue";
  
  export default {
    name: "Radio",
    data() {
      return {
        usuarios_conectados: 0,
      };
    },
    components: {
      Entrar,
      Chat,
      Patrocinar,
      Grilla,
      Usuarios,
      BannerResolume,
    },
    computed: {
      getToken() {
        return this.$store.getters.getToken;
      },
      getRole() {
        return this.$store.getters.getUser;
      },
      ...mapGetters(["getUser", "getTokenString"]),
    },
    mounted() {
      if (this.getToken) {
        const user = this.getRole;
        if (user && user._id) {
          // Logic for authenticated user
        }
      } else {
        console.warn("No hay token disponible.");
      }
      this.init();
  
      // Parallax Effect
      window.addEventListener("scroll", () => {
        const parallax = document.querySelector(".parallax");
        let scrollPosition = window.pageYOffset;
        parallax.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      });
    },
    methods: {
      init() {
        socket.on("connect", () => {
          console.log("Conectado al servidor de socket.io");
          if (this.getToken) {
            const user = this.getRole;
            if (user && user._id) {
              socket.emit("join", { userId: user._id });
              console.log("User ID enviado al servidor:", user._id);
            }
          } else {
            console.warn("No hay token disponible.");
          }
        });
        socket.on("updateOnlineUsers", (data) => {
          console.log("Usuarios en línea:", data);
          this.usuarios_conectados = data;
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Parallax Styling */
  .parallax {
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 300px;
  }
  
  /* Custom Animations */
  .animate-fade-in {
    animation: fadeIn 1s ease-in;
  }
  
  .animate-fade-in-delay {
    animation: fadeIn 1s ease-in 0.5s forwards;
    opacity: 0;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-bounce {
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  </style>