<template>
    <div>
        <div class="p-4 rounded mt-4 bg-black">
            <h2 class="text-2xl font-bold "><i class="fa-icon-class text-4xl text-black mb-4"></i>Patrocinadores </h2>
            <div class="mt-4 space-y-4">
                <p v-if="patrocinadores.length === 0">No hay patrocinadores. ¡Sé el primero!</p>

                <div v-for="patrocinador in patrocinadores" :key="patrocinador.id" class="flex justify-between items-center bg-gray-700 p-2 rounded">
                    <div class="flex items-start space-x-4 text-left">
                        <img :src="patrocinador.usuario.imagen" alt="patrocinador" class="w-12 h-12 rounded-full">
                        <div>
                            <h3 class="font-bold">{{ patrocinador.usuario.displayName }}</h3>
                            <p class="text-sm text-gray-400">{{ patrocinador.createdAt }} hs</p>
                        </div>
                    </div>
                    <span>{{ formatCurrency(patrocinador.monto) }}</span>
                </div>

                <div v-if="!getTokenString" class="mb-4">
                    <p class="text-center text-white mt-2 pt-4">Necesitas entrar para poder patrocinar.</p>
                    <a href="https://api-aura.armortemplate.com/auth/google"
                        class="flex items-center px-4 py-2 bg-white text-gray-700 font-medium border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 m-auto mt-2 mb-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/48px-Google_%22G%22_logo.svg.png?20230822192911"
                            alt="Google" class="w-5 h-5 mr-2 ">
                        Entrar con Google
                    </a>
                </div>

                <!-- Slider -->
                <div v-if="getTokenString">
                    <div class="mt-4">
                        <h2 class="text-2xl font-bold text-white">Patrocina la radio</h2>
                        <label for="amount" class="block text-1xl font-medium text-white">Selecciona el monto</label>
                        <input type="range" id="amount" name="amount" v-model="montoPatrocinio" min="100" max="50000" step="100"
                            class="w-full mt-2 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer" />
                        <div class="flex justify-between mt-2 font-bold text-white">
                            <span class="text-2xl">{{ formatCurrency(100) }}</span>
                            <span class="text-2xl">{{ formatCurrency(50000) }}</span>
                        </div>
                        <p class="text-center text-white font-bold mt-2">Monto seleccionado: {{ formatCurrency(montoPatrocinio) }}</p>
                    </div>

                    <button class="w-full bg-green-500 p-2 rounded mt-4 text-bold text-2xl" @click="patrocinar">
                        <i class="fa-solid fa-star"></i> Patrocinar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import moment from "moment";

export default {
    data() {
        return {
            patrocinadores: [],
            montoPatrocinio: 100, // Valor inicial del slider
        };
    },
    mounted() {
        this.getPatrocinadores();

        //traer nuevos patrocinadores cada 60 segundos
        setInterval(() => {
            this.getPatrocinadores();
        }, 60000);
    },
    methods: {
        async getPatrocinadores() {
            try {
                const response = await axios.get("https://api-aura.armortemplate.com/patrocinadores", {
                
                });
                response.data.data.forEach((patrocinador) => {
                    patrocinador.createdAt = moment(patrocinador.createdAt).format("DD/MM/YYYY HH:mm");
                });
                //ordenar por fecha de creación el ultimo primero
                this.patrocinadores = response.data.data.reverse();


//                this.patrocinadores = response.data.data;
            } catch (error) {
                console.error("Error al obtener patrocinadores:", error);
            }
        },
        async patrocinar() {
            console.log("Monto seleccionado:", this.montoPatrocinio);
            //transformar quitar el formato de moneda
            // this.montoPatrocinio = this.montoPatrocinio.replace("$", "").replace(".", "").replace(",", "");
            console.log("Monto seleccionado sin formato:", this.montoPatrocinio);
            // tranformar a enentyero
            this.montoPatrocinio = parseInt(this.montoPatrocinio);
            // Aquí puedes realizar una llamada a tu backend para enviar el monto
            // post https://api-aura.armortemplate.com/generar-link-patrocinar patrocinador, monto
            axios.post("https://api-aura.armortemplate.com/generar-link-patrocinar", {
                patrocinador: this.getUser,
                monto: this.montoPatrocinio,

            },
            {
                headers: {
                    Authorization: `Bearer ${this.getTokenString}`,
                },
            }
        ).then((response) => {
                console.log("Link de pago:", response.data);
                // window.open(response.data.data, "_blank");
                //redirect
                window.location.href = response.data
            }).catch((error) => {
                console.error("Error al patrocinar:", error);
            });
        },
        formatCurrency(value) {
            return new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS"
            }).format(value);
        }
    },
    computed: {
        ...mapGetters(["getTokenString", "getUser"]),
    },
};
</script>
