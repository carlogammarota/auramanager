<template>
    <div>
        <!-- Modal overlay -->
        <!-- {{ getRole }} -->
        <div v-if="loader" class="h-screen flex items-center justify-center"><span class="loader"></span></div>
        <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" v-if="modalconsumicion">
            <!-- Modal container -->
            <div class="bg-white rounded-lg p-4 mx-4">
                <!-- Modal content -->

                <div class="text-lg my-4">¿ Entregar Consumicion ?</div>
                <!-- Botones del modal -->
                <div class="flex justify-end botones">
                    <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
                        @click="cancelar()">Cancelar</button>
                    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        @click="confirmarconsumicion()">Entregar</button>
                </div>
            </div>
        </div>
        <!-- Modal overlay -->
        <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" v-if="modal">
            <!-- Modal container -->
            <div class="bg-white rounded-lg p-4 mx-4">
                <!-- Modal content -->
                <!-- <h3 class="mb-2">Ingrese 3 ultimos numeros dni</h3> -->
                <!-- <input type="number" v-model="dni"
                    class="w-24 p-2 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 documento"
                    max="999"> -->

                <div class="text-lg my-4">¿ Confirmar Ingreso ?</div>
                <!-- Botones del modal -->

                <div class="flex justify-end botones">
                    <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
                        @click="cancelar()">Cancelar</button>
                    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        @click="confirmar()">Confirmar</button>
                </div>
            </div>
        </div>
        <!-- {{ entrada }}  -->
        <div class="flex items-center justify-center h-full" v-if="!entrada._id && !loader">
            <div class="d-block">
                <i class="fas fa-exclamation-circle text-red-500 mr-2 te" style="font-size: 50px;"></i>
            </div>
            <p class="text-center text-2xl">El Ticket no existe</p>
        </div>





        <div class="mx-2 mb-24 mt-12" v-if="entrada._id">
            <!-- <h1 class="text-4xl">TICKET</h1> -->

            <div class="max-w-md w-full h-full z-10 bg-purple-900 rounded-3xl m-auto">
                <div class="flex flex-col mt-4">
                    <div class="bg-white relative drop-shadow-2xl rounded-3xl p-4 m-4" style="background: #f5eef9;">
                        <div class="">
                            <div class=" relative h-32 w-32   sm:mb-0 mb-3 hidden">
                                <img src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
                                    alt="aji" class=" w-32 h-32 object-cover rounded-2xl">
                                <a href="#"
                                    class="absolute -right-2 bottom-2   -ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        class="h-4 w-4">
                                        <path
                                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                                        </path>
                                    </svg>
                                </a>
                            </div>
                            <div class=" m-auto justify-center">
                                <div class=" items-center">

                                    <img src="@/assets/logo.png" class=" mx-auto mb-4">

                                    <!-- {{ entrada }} -->
                                    <!-- <h1 class="text-4xl text-green-600" v-if="entrada.consumicion">+1 consumicion</h1> -->
                                    <h1 class="text-4xl text-red-600 line-through" v-if="!entrada.consumicion">+1
                                        Consumicion
                                    </h1>
                                </div>
                                <div class=" items-center justify-between mt-4">
                                    <div class=" items-center text-center  my-1">
                                        <h2 class="font-medium text-1xl">Aura Productora Ticket</h2>
                                    </div>

                                </div>
                                <!-- <div class="ml-auto text-blue-800">{{ entrada._id }}</div> -->
                                <!-- //mostrar dni -->
                                <div v-if="entrada.dni">
                                    <p class="mt-8 text-1xl">Ultimos 3 numeros</p>
                                    <div class="ml-auto text-blue-800 text-3xl mb-2">
                                        <span class="font-bold">DNI: {{ entrada.dni }}</span>
                                    </div>
                                </div>
                                <!-- {{ entrada.dni }} -->
                                <!-- <div class="border-b border-dashed border-b-2 my-5"></div> -->

                                <div class="border-b border-dashed border-black border-b-2  pt-5">

                                    <div class="absolute rounded-full w-5 h-5 bg-purple-900 -mt-2 -left-2"></div>
                                    <div class="absolute rounded-full w-5 h-5 bg-purple-900 -mt-2 -right-2"></div>
                                </div>
                                <div class=" items-center p-5 text-sm mt-4">
                                    <div class="flex flex-col">
                                        <!--  -->
                                        <h2 class="text-3xl text-red-600 uppercase mb-2 py-2 px-4"
                                            v-if="entrada.estado == 'ingreso' && !loader">YA INGRESO</h2>
                                        <h2 class="text-3xl text-green-600 uppercase mb-2 py-2 px-4"
                                            v-if="entrada.estado == 'no-ingreso' && !loader"> AUN NO INGRESO</h2>

                                        <div v-if="loader"><span class="loader"></span></div>
                                        <button
                                            v-if="getRole == 'entrada' || getRole == 'admin' && entrada.estado == 'no-ingreso' && !loader"
                                            @click="confirmarIngreso()"
                                            class="uppercase bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                            Confirmar Ingreso
                                        </button>
                                    </div>
                                    <!-- <div class="flex flex-col ml-auto">
                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Button
                                    </button>
								</div> -->
                                </div>

                                <div class="border-b border-dashed border-black border-b-2  pt-2">
                                    <div class="absolute rounded-full w-5 h-5 bg-purple-900 -mt-2 -left-2"></div>
                                    <div class="absolute rounded-full w-5 h-5 bg-purple-900 -mt-2 -right-2"></div>
                                </div>
                                <div class=" items-center p-5 text-sm mt-4">
                                    <div class="flex flex-col">
                                        <!--  -->
                                        <h2 v-if="!entrada.consumicion"
                                            class="text-3xl text-red-600 uppercase mb-2 py-2 px-4">Consumición ENTREGADA
                                        </h2>
                                        <h2 v-if="entrada.consumicion && !loaderconsumicion"
                                            class=" text-3xl text-green-600 uppercase mb-2 py-2 px-4">+1 Consumición
                                        </h2>

                                        <div v-if="loaderconsumicion"><span class="loader"></span></div>
                                        <button
                                            v-if="getRole == 'barra' || getRole == 'admin' && entrada.consumicion && !loaderconsumicion"
                                            @click="Entregarconsumicion()"
                                            class="uppercase bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                            Entregar Consumición
                                        </button>
                                    </div>
                                    <!-- <div class="flex flex-col ml-auto">
                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Button
                                    </button>
								</div> -->
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import QrScaner from '../components/QrScaner.vue'
export default {

    data() {
        return {
            entrada: {},
            modal: false,
            loader: false,
            loaderconsumicion: false,
            scaner: false,
            modalconsumicion: false,
            dni: 0,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2ODM4MzUzMTksImV4cCI6MTY4MzkyMTcxOSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjQ1ZDNiZGUzZjY5Y2IwY2E5MTBiODJkIiwianRpIjoiNjU0NjBkMjctN2IxZC00ZDc2LTkwZDAtZmUzZDlmZTI5NzJiIn0.fhFPyewJQBoBmJMM81cXimZJwpLY119ZVNAOgJtfofU"
        }
    },
    methods: {
        confirmarIngreso() {
            this.modal = true
        },
        Entregarconsumicion() {
            this.modalconsumicion = true
        },
        confirmarconsumicion() {
            this.modalconsumicion = false;
            this.loaderconsumicion = true;
            axios.patch('https://apiauramanager.alguientiene.com/entradas/' + this.$route.params.id, {

                consumicion: false
            }, {
                headers: { 'Authorization': 'Bearer ' + this.token }
            }).then(response => {
                // const sound = new Audio(require('@/assets/ingreso.mp3'))
                // sound.play()
                this.loaderconsumicion = false;
                this.entrada = response.data
                this.modalconsumicion = false;
                // this.$router.push('/entradas')
            }).catch(error => {
                console.log(error)
                this.loaderconsumicion = false;
            });

            // axios.patch('http://

        },
        async confirmar() {


            //si dni es mayor a 3 caracteres de numeros
            let dni = this.dni.toString().length > 2 && !isNaN(this.dni)
            let dniMayor = this.dni.toString().length < 4 && !isNaN(this.dni)

            //y si el dni es mayor a 

            // if (dni && dniMayor) {
            this.modal = false;
            this.loader = true;
            axios.patch('https://apiauramanager.alguientiene.com/entradas/' + this.$route.params.id, {
                // axios.patch('http://192.168.1.8:5050/entradas/' + this.$route.params.id, {
                estado: 'ingreso',
                // dni: ''
            }, {
                headers: { 'Authorization': 'Bearer ' + this.token }
            }).then(response => {
                const sound = new Audio(require('@/assets/ingreso.mp3'))
                sound.play()
                this.entrada = response.data
                this.loader = false

            })
                .catch(error => {
                    console.log(error);
                    this.loader = false;
                })
            this.modal = false
            // } else {
            //     this.loader = false;
            //     alert('Ingrese un DNI valido')
            // }



        },
        cancelar() {

            this.modal = false;
            this.modalconsumicion = false;
            // this.$router.push({ name: 'entradas' })
        },

        getEntrada() {
            this.loader = true
            axios.get('https://apiauramanager.alguientiene.com/entradas/' + this.$route.params.id,
                {
                    headers: { 'Authorization': 'Bearer ' + this.token }
                })
                .then(response => {
                    this.loader = false
                    this.entrada = response.data
                })
                .catch(error => {
                    this.loader = false
                    console.log(error)
                })
        }
    },
    mounted() {

        this.getEntrada()
        // this.getEntrada()
        console.log('ruta', this.$route.params.id)
    },
    computed: {
        getRole() {
            return this.$store.getters.getUser


        },
    },
}
</script>
<style>
.barcode {
    left: 50%;
    box-shadow: 1px 0 0 1px, 5px 0 0 1px, 10px 0 0 1px, 11px 0 0 1px, 15px 0 0 1px, 18px 0 0 1px, 22px 0 0 1px, 23px 0 0 1px, 26px 0 0 1px, 30px 0 0 1px, 35px 0 0 1px, 37px 0 0 1px, 41px 0 0 1px, 44px 0 0 1px, 47px 0 0 1px, 51px 0 0 1px, 56px 0 0 1px, 59px 0 0 1px, 64px 0 0 1px, 68px 0 0 1px, 72px 0 0 1px, 74px 0 0 1px, 77px 0 0 1px, 81px 0 0 1px, 85px 0 0 1px, 88px 0 0 1px, 92px 0 0 1px, 95px 0 0 1px, 96px 0 0 1px, 97px 0 0 1px, 101px 0 0 1px, 105px 0 0 1px, 109px 0 0 1px, 110px 0 0 1px, 113px 0 0 1px, 116px 0 0 1px, 120px 0 0 1px, 123px 0 0 1px, 127px 0 0 1px, 130px 0 0 1px, 131px 0 0 1px, 134px 0 0 1px, 135px 0 0 1px, 138px 0 0 1px, 141px 0 0 1px, 144px 0 0 1px, 147px 0 0 1px, 148px 0 0 1px, 151px 0 0 1px, 155px 0 0 1px, 158px 0 0 1px, 162px 0 0 1px, 165px 0 0 1px, 168px 0 0 1px, 173px 0 0 1px, 176px 0 0 1px, 177px 0 0 1px, 180px 0 0 1px;
    display: inline-block;
    transform: translateX(-90px);
}

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

.documento {
    font-size: 50px;
    width: 100% !important;
    padding: 0;
}

.botones {
    margin: auto !important;
    display: block !important;

}
</style>