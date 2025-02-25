<template>
    <div class="bg-gray-900 text-white">
        <div class="container mx-auto p-4">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="lg:col-span-2 text-white p-4 rounded">

                    <img src="../assets/Ahora-en-Vivo.png" class="bg-white mb-4" alt="Evento Aura"
                        style="max-width: 100%; height: auto;">
                    <!-- <img src="../assets/Programacion1.jpg" alt="" class="mb-4"> -->

                    <video controls crossorigin playsinline style="width: 100%;">
                        <source type="application/x-mpegURL"
                            src="https://live.armortemplate.com/stream/hls/playlist.m3u8">
                    </video>

                    <div class="bg-gray-800 p-4 rounded mt-4">
                        <h2 class="text-xl font-bold">Usuarios Conectados {{ usuarios_conectados }}</h2>
                    </div>
                    <Chat></Chat>
                    <Grilla></Grilla>

                </div>
                <div class="text-white p-4 rounded">
                    <img src="../assets/slogan.png" class="mb-8" alt="">
                    <div class="flex items-center space-x-2 p-4 bg-gray-800 text-white rounded-lg shadow-md mb-4">
                        <i class="fab fa-youtube text-2xl"></i>
                        <a href="https://www.youtube.com/@auraproductora9208" target="_blank"
                            class="text-xl font-semibold hover:text-red-500">
                            YouTube Aura Producciones
                        </a>
                    </div>



                    <div
                        class="mb-2 text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg mt-8">
                        <h2 class="text-2xl font-bold text-white mb-4 animate__animated animate__fadeIn">¿Quieres salir
                            en vivo en nuestra radio? 🎙️📻</h2>
                        <p class="text-lg text-white mb-6 animate__animated animate__fadeIn animate__delay-1s">
                            ¡Hazlo ahora, envíanos un mensaje y te diremos cómo! <br>
                        </p>
                        <!-- <a href="https://wa.me/543548546712"
                            class="inline-block bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold transition transform hover:scale-105 hover:bg-green-600 animate__animated animate__fadeIn animate__delay-2s">
                            <i class="fab fa-whatsapp mr-2"></i> Enviar mensaje a WhatsApp
                        </a> -->
                        <div class="mt-4">
                            <a href="https://wa.me/543548546712"
                                class="inline-block text-white text-lg font-semibold hover:text-gray-300 transition">
                                <i class="fas fa-info-circle mr-2"></i> Más información
                            </a>
                        </div>
                    </div>


                    <a href="https://aura.armortemplate.com/comprar" class="hidden">
                        <img class="mt-4" src="../assets/NUEVO_FLAYER.jpg" alt="">
                        <img class="mt-4 cursor-pointer" src="../assets/comprar-tickets.png" alt="">
                    </a>

                    <div>

                    </div>

                    <!-- patrocinadores, muy pronto! -->
                    <Patrocinar></Patrocinar>
                </div>
            </div>
        </div>

        <!-- Main Container -->
        <div class="flex items-center justify-center h-screen bg-gray-100 text-gray-800 text-center hidden">
            <div>
                <i class="fa-icon-class text-4xl text-red-500 mb-4"></i>
                <p class="text-3xl font-semibold">Estamos realizando pruebas de transmisión, sepá disculpar.</p>
            </div>
        </div>
    </div>
</template>
<script>
import Entrar from "@/components/Entrar.vue";
import { mapGetters } from "vuex";
import socket from "@/plugins/socket"; // Importa el plugin
import Chat from "@/components/Chat.vue";
import Patrocinar from "@/components/Patrocinar.vue";
import Grilla from "@/components/Grilla.vue";
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
            const user = this.getRole; // Obtén el usuario desde Vuex
            if (user && user._id) {

            }
        } else {
            console.warn("No hay token disponible.");
        }
        this.init();
    },
    methods: {

        init() {
            socket.on("connect", () => {
                console.log("Conectado al servidor de socket.io");
                //emitir token para conectar al chat
                if (this.getToken) {
                    const user = this.getRole; // Obtén el usuario desde Vuex
                    if (user && user._id) {
                        // Envía el user._id al servidor por socket
                        socket.emit("join", { userId: user._id });
                        console.log("User ID enviado al servidor:", user._id);
                    }
                } else {
                    console.warn("No hay token disponible.");
                }
            });
            // updateOnlineUsers
            socket.on("updateOnlineUsers", (data) => {
                console.log("Usuarios en línea:", data);
                this.usuarios_conectados = data;
            });


        }
    },
};
</script>


<style></style>