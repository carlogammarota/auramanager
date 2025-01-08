<template>
    <div>
        <!-- GRACIAS POR SU COMPRA -->

        <div class="min-h-screen bg-black flex items-center justify-center">
            <div v-if="loader"><span class="loader"></span></div>
            <div class="bg-black p-8 rounded shadow-md max-w-md w-full" v-if="!loader">
                <h1 class="text-2xl font-bold mb-4 text-white">Información</h1>
                <img src="@/assets/logoAztecBlanco2.png" class=" mx-auto mb-4" style="width:300px !important;"></img>
                
                <!-- <h1 class="text-2xl font-bold text-white">Aura Productora</h1> -->
                <p class="mb-4 text-white"><strong>Fecha:</strong> Lunes 01/01 1:00hs AM</p>
                
                
                <div v-if="compra.estado == 'rechazado'">
                    <p class="text-2xl text-red-600 uppercase bg-black text-white">{{ compra.estado }}</p>
                    <div class="mt-14">
                        <a :href="compra.linkDePago" target="_blank"
                            class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mx-2 uppercase">
                            Reintentar Pago
                        </a>
                    </div>
                </div>

                <div v-if="compra.estado == 'aprobado'">
                    <p class="text-2xl text-green-600 uppercase bg-black text-white">PAGO {{ compra.estado }}</p>
                    <h1 class="text-white">GRACIAS POR TU COMPRA !</h1>
                    <p class="my-6 text-3xl text-white"><strong>Cantidad de Tickets:</strong> {{ compra.cantidadTickets }}</p>

                    <div class="flex justify-center mt-8" v-for="link in linkEntradas" :key="link.index">
                        <a href="#" :href="link.link" target="_blank"
                            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mx-2 uppercase">
                            Descargar Ticket {{ link.idNumero }}
                        </a>
                    </div>
                </div>

                <Ayuda class="mt-24 bg-gray-700 p-4 rounded text-white"></Ayuda>
            </div>
        </div>
    </div>
</template>

<script>
import Ayuda from '@/components/Ayuda.vue'
import axios from 'axios'
export default {
    data() {
        return {
            id: this.$route.params.id,
            order: {},
            products: [],
            total: 0,
            compra: {},
            linkEntradas: {},
            loader: false
        }
    },
    async mounted() {

        this.loader = true
        axios.get(`https://api.charlygproducciones.com/payments/${this.id}`).then((response) => {
            this.compra = response.data

            axios.get(`https://api.charlygproducciones.com/link-entradas/${this.id}`).then((response) => {
                this.linkEntradas = response.data.linkEntradas
                this.loader = false
                console.log(this.linkEntradas)
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        })


    },
    components: {
        Ayuda
    }
}
</script>