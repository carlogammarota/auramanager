<template>
    <div class="bg-gray-900 text-white">




        <div class="container mx-auto p-4">
            <div class="grid grid-cols-3 gap-4">
                <!-- Columna más grande -->
                <div class="col-span-2 text-white p-4 rounded">
                    <img src="../assets/Ahora-en-Vivo.png" class="bg-white mb-4" alt="Evento Aura"
                        style="max-width: 100%; height: auto; ">
                    <img src="../assets/Programacion1.jpg" alt="" class="mb-4">

                    <video controls crossorigin playsinline style="width: 100%;">
                        <source type="application/x-mpegURL"
                            src="https://live.armortemplate.com/stream/hls/playlist.m3u8">
                    </video>

                    <!-- usuarios conectados -->
                    <div class="bg-gray-800 p-4 rounded mt-4">
                        <h2 class="text-xl font-bold">Usuarios Conectados {{ usuarios_conectados }}</h2>
                    </div>
                    <!-- Comments Section -->
                    <div class="mt-4 mb-8">
                        <div class="bg-gray-800 p-4 rounded text-left">

                            <p class="bg-green-800 p-2 mb-2">{{ getUser._id }}</p>

                            <h2 class="text-xl font-bold">Chat en Vivo</h2>
                            <div class="mt-4">
                                <div class="flex items-start space-x-4 mb-4">
                                    <i class="fas fa-user-circle text-2xl mt-2"></i>
                                    <div>
                                        <h3 class="font-bold">Jose Alvarez</h3>
                                        <p>Hola!!</p>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-4 mb-4">
                                    <i class="fas fa-user-circle text-2xl mt-2"></i>
                                    <div>
                                        <h3 class="font-bold">Pepe Argento</h3>
                                        <p>Muy buena musica!</p>
                                    </div>
                                </div>
                                <div class="flex items-center hayToken">
                                    <input type="text" placeholder="Escribe un mensaje..." v-model="message"
                                        class="flex-grow p-2 rounded border border-gray-600 bg-gray-800 text-white" />
                                    <button @click="sendMessage"
                                        class="ml-2 px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">
                                        Enviar
                                    </button>
                                </div>
                                <!-- <input type="text" disabled placeholder="Escribe un mensaje..." class="w-full p-2 rounded bg-gray-700 text-white" /> -->
                            </div>
                        </div>
                        <div class="bg-gray-800 p-4 pt-0 pb-1 rounded noHayToken">
                            <Entrar></Entrar>
                        </div>

                        <!-- Input Section -->
                    </div>

                </div>
                <!-- Columna más pequeña -->
                <div class="text-white p-4 rounded">
                    <img src="../assets/slogan.png" alt="">

                    <a href="https://aura.armortemplate.com/comprar">
                        <img class="mt-4" src="../assets/FLAYER_1.jpg" alt="">
                        <img class="mt-4 cursor-pointer" src="../assets/comprar-tickets.png" alt="">
                    </a>

                    <!-- patrocinadores, muy pronto! -->
                    <div class=" p-4 rounded mt-4 hidden">
                        <h2 class="text-xl font-bold">Patrocinadores </h2>
                        <div class="mt-4 space-y-4">

                            <div class="flex justify-between items-center bg-gray-700 p-2 rounded">
                                <div class="flex items-start space-x-4">
                                    <i class="fas fa-user-circle text-3xl mt-1"></i>
                                    <div>
                                        <h3 class="font-bold">Roberto Luis</h3>
                                        <p class="text-sm text-gray-400">Hace 2 horas</p>
                                        <!-- <p>Comentario del stream.</p> -->
                                    </div>
                                </div>
                                <span>ARS $200</span>
                            </div>

                            <!-- login -->
                            <Entrar></Entrar>
                            <button class="w-full bg-green-500 p-2 rounded mt-4" v-if="getToken">Patrocinar</button>


                        </div>
                    </div>
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

export default {
    name: "Radio",
    data() {
        return {
            usuarios_conectados: 0,
            message: "",
        };
    },
    components: {
        Entrar,
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
                // Envía el user._id al servidor por socket
                socket.emit("join", { userId: user._id });
                console.log("User ID enviado al servidor:", user._id);
            }
        } else {
            console.warn("No hay token disponible.");
        }
        this.init();
    },
    methods: {
        sendMessage() {
            console.log("Mensaje enviado");
            socket.emit("chat message", { message: this.message });
        },

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

            // chat message
            socket.on("chat message", (data) => {
                console.log("Mensaje de chat:", data);
            });
        }
    },
};
</script>


<style></style>