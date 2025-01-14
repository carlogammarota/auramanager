<template>
    <div class="mt-4 mb-8">
        <div class="bg-gray-800 p-4 rounded text-left" v-if="getTokenString">
            <p class="bg-green-800 p-2 mb-2">{{ getUser._id }}</p>
            <h2 class="text-xl font-bold">Chat en Vivo</h2>
            <div class="mt-4">
                <div v-for="(msg, index) in messages" :key="index" class="flex items-start space-x-4 mb-4">
                    <i class="fas fa-user-circle text-2xl mt-2"></i>
                    <div>
                        <h3 class="font-bold">{{ msg.user }}</h3>
                        <p>{{ msg.text }}</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <input
                        type="text"
                        placeholder="Escribe un mensaje..."
                        v-model="message"
                        class="flex-grow p-2 rounded border border-gray-600 bg-gray-800 text-white"
                    />
                    <button
                        @click="sendMessage"
                        class="ml-2 px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
                    >
                        Enviar
                    </button>
                </div>
            </div>
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
    computed: {
        ...mapGetters(["getUser", "getToken", "getTokenString"]),
    },
    created() {
        // Escucha mensajes entrantes
        socket.on("receiveMessage", (data) => {
            this.messages.push(data);
        });
    },
    methods: {
        sendMessage() {
            // if (this.message.trim() === "") return;
            const user = this.getUser.nombre || "Anónimo";
            socket.emit("sendMessage", { user, text: this.message });
            this.message = ""; // Limpia el input
        },
    },
};
</script>
