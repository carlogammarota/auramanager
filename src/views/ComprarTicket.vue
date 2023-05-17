<template>
    <div>
        <div class="flex justify-center items-center" v-if="ventaDeEntradas">
            <div v-if="loader"><span class="loader"></span></div>
            <div v-if="!loader" class="bg-blue-100 p-4 rounded ">

                <!-- <h1 class="text-2xl font-bold mb-4">Información de Pago</h1> -->
                <h2 class="text-2xl font-bold">Comprar Ticket</h2>
                <img src="@/assets/logo.png" class=" mx-auto" style="width:300px !important;"></img>


                <h1 class="text-2xl font-bold">Aura Productora</h1>
                <p class="mb-4"> Viernes 19 de Mayo 00:00hs</p>
                <p class="text-2xl">Valpisa</p>
                <br class=""> Diag. Buenos Aires 102, <br> Capilla del Monte, Córdoba</p>

                <!-- <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0"> -->
                <div class="my-8">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                        Cantidad de Tickets
                    </label>
                    <input v-model="cantidadDeTickets"
                        class="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-zip" type="number" placeholder="1">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Email
                    </label>
                    <input v-model="email"
                        class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" type="email" placeholder="tuemail@gmail.com">
                </div>
                <!-- </div> -->
                <p>Ticket con +1 Consumición</p>
                <img src="@/assets/mercadopago.webp" class=" mx-auto my-8" style="width:100px !important;"></img>
                <div class="mt-8 pb-4 w-full">

                    <button @click="generarLink()"
                        class="py-2 px-4 rounded text-white font-semibold text-center btn-comprar bg-green-500 w-full">
                        Comprar Ticket
                    </button>
                </div>
                <Ayuda class="mt-12 bg-gray-300 p-4 rounded" />
            </div>
        </div>

        <div v-if="!ventaDeEntradas">
            <!-- generar en tailwindcss un mensaje que diga que no hay entradas disponibles -->
            <div class="h-screen m-auto mt-24">
                <p class="text-2xl font-bold ">No hay entradas disponibles</p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Ayuda from "@/components/Ayuda.vue";
export default {
    name: "venta-de-entradas",
    data() {
        return {
            ventaDeEntradas: true,
            linkDePago: '',
            loader: false,
            cantidadDeTickets: 1,
            email: ''
        };
    },
    async mounted() {

    },
    methods: {
        async generarLink() {

            // console.log('generarLink');
            //comprobar si es un email valido
            // console.log('this.email', this.email);
            let comprobacionEmail = this.email.includes('@');


            //si cantidad de tickets es mayor a 0 y email no es null

            if (this.cantidadDeTickets > 0 && comprobacionEmail) {
                this.loader = true;
                axios.post('https://apiauramanager.alguientiene.com/generar-link', {
                    "cantidad": this.cantidadDeTickets,
                    "email": this.email
                }).then((response) => {
                    this.loader = false;
                    console.log('response', response.data);
                    this.linkDePago = response.data;
                    // window.open(this.linkDePago, '_blank');
                    //redirigir en la misma pagina
                    window.location.href = this.linkDePago;
                }, (error) => {
                    console.log('error', error);
                    this.loader = false;
                });
                return;
            }
            if (this.cantidadDeTickets == 0) {
                alert('Debe ingresar una cantidad de tickets');
                return;
            }
            if (!comprobacionEmail) {
                alert('Debe ingresar un email valido');
                return;
            }
            if (this.email == '') {
                alert('Debe ingresar un email');
                return;
            }

            // if (this.email == '') {
            //     alert('Debe ingresar un email');
            //     return;
            // }


            // console.log('linkDePago', linkDePago);
        }
    },
    components: {
        Ayuda
    },
};
</script>
<style>
.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: #FF3D00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>