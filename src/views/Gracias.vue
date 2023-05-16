<template>
    <div>
        <!-- GRACIAS POR SU COMPRA -->
        <div class="min-h-screen bg-gray-100 flex items-center justify-center">
            <div class="bg-white p-8 rounded shadow-md max-w-md w-full">
                <h1 class="text-2xl font-bold mb-4">Información de Pago</h1>
                <h1 class="text-2xl font-bold">Aura Productora</h1>
                <p class="mb-4"><strong>Fecha:</strong> Viernes 19 de mayo a las 00:00hs</p>
                <!-- {{ compra.estado }} -->


                <!-- aprobado
                rechazado -->
                <!-- {{ compra }} -->
                <!-- Cantidad de tickets -->
                <img src="@/assets/logo.png" class=" mx-auto mb-4" style="width:300px !important;"></img>
                <div v-if="compra.estado == 'rechazado'">
                    <p class="text-2xl text-red-600 uppercase bg-black">{{ compra.estado }}</p>
                    <div class="mt-14">
                        <a :href="compra.linkDePago" target="_blank"
                            class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mx-2 uppercase">
                            Reintentar Pago
                        </a>
                    </div>

                </div>
                <div v-if="compra.estado == 'aprobado'">

                    <p class="text-2xl text-green-600 uppercase bg-white">{{ compra.estado }}</p>
                    <h1>GRACIAS POR TU COMPRA !</h1>
                    <p class="my-6 text-3xl"><strong>Cantidad de Tickets:</strong> {{ compra.cantidadTickets }}</p>


                    <!-- {{ compra }} -->
                    <!-- {{ compra }} -->

                    <!-- Aquí puedes agregar más detalles de pago si los necesitas -->

                    <div class="flex justify-center mt-8" v-for="link in linkEntradas" :key="link.index">
                        <!-- {{ compra }} -->
                        <!-- {{ compra.linkEntradas }} -->
                        <!-- {{ link }} -->
                        <a href="#" :href="link.link" target="_blank"
                            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mx-2 uppercase">
                            Descargar Ticket {{ link.idNumero }}
                        </a>
                    </div>
                </div>

                <!-- <p class="mb-4"><strong>Nombre de la fiesta:</strong> Aura Productora</p> -->


                <!-- {{ linkEntradas }} -->


            </div>
        </div>
        <!-- {{ compra }} -->
        <!-- {{ linkEntradas }} -->
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            id: this.$route.params.id,
            order: {},
            products: [],
            total: 0,
            compra: {},
            linkEntradas: {}
        }
    },
    async mounted() {
        this.compra = await axios.get(`https://apiauramanager.alguientiene.com/payments/${this.id}`);

        this.linkEntradas = await axios.get(`https://apiauramanager.alguientiene.com/link-entradas/${this.id}`)
        this.linkEntradas = this.linkEntradas.data.linkEntradas

        console.log(this.linkEntradas.data)

        // this.compra = await axios.get(`https://apiauramanager.alguientiene.com/link-entradas/${this.id}`)
        // this.compra = await axios.get(`http://192.168.1.8:5050/link-entradas/646325afef88831bf2e0b749`)
        console.log(this.compra.data)
        this.compra = this.compra.data

    },
}
</script>