<template>
    <div>
        <!-- Modal overlay -->
<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" v-if="modal">
  <!-- Modal container -->
  <div class="bg-white rounded-lg p-4 mx-4">
    <!-- Modal content -->
    <div class="text-lg mb-4">Confirmar Ingreso ?</div>
    <!-- Botones del modal -->
    <div class="flex justify-end">
      <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mr-2" @click="cancelar()">Cancelar</button>
      <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg" @click="confirmar()">Confirmar</button>
    </div>
  </div>
</div>  
       <!-- {{ entrada }}  -->
        <div v-if="!entrada._id" class="mx-4">
            <h1 class="text-red-400 text-2xl" >EL TICKET NO EXISTE</h1>

<h1 @click="scaner = true" v-if="!scaner" class="text-3xl my-8 bg-base-400 p-2 border-2 border-black cursor-pointer">Escanear QR</h1>
                        <!-- <button @click="scanQR">Escanear QR</button> -->
                        <QrScaner v-if="scaner" />
                        <h1 @click="scaner = false" v-if="scaner" class="text-2xl my-4 bg-base-400 p-2 border-2 border-black cursor-pointer">Cerrar Scaner</h1>


        </div>
       

        
        <div class="mx-2" v-if="entrada._id">
            <h1 class="text-4xl">TICKET</h1>
            
        <div class="max-w-md w-full h-full z-10 bg-purple-900 rounded-3xl ">
		<div class="flex flex-col mt-4">
			<div class="bg-white relative drop-shadow-2xl  rounded-3xl p-4 m-4">
				<div class="">
					<div class=" relative h-32 w-32   sm:mb-0 mb-3 hidden">
						<img src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg" alt="aji" class=" w-32 h-32 object-cover rounded-2xl">
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
						<div class=" items-center justify-between">
							<div class=" items-center text-center  my-1">
								<h2 class="font-medium">Aura Productora Ticket</h2>
							</div>
							
						</div>
                        <div class="ml-auto text-blue-800">{{ entrada._id  }}</div>
						<!-- <div class="border-b border-dashed border-b-2 my-5"></div> -->
						<div class=" items-center">
							
								<img src="@/assets/logo.png" class=" mx-auto mb-4">
                                
							
                            <h1>+1 Consumision</h1>
							</div>
							<div class="border-b border-dashed border-b-2  pt-5">
                                
								<div class="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
								<div class="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
							</div>
							<div class=" items-center p-5 text-sm mt-4">
								<div class="flex flex-col">
                                    <!--  -->
                                    <h2 class="text-3xl text-red-600 uppercase mb-2 py-2 px-4" v-if="entrada.estado == 'ingreso' && !loader" >YA INGRESO</h2>
                                     <h2 class="text-3xl text-green-600 uppercase mb-2 py-2 px-4" v-if="entrada.estado == 'no-ingreso' && !loader"> AUN NO INGRESO</h2>
                                    <div v-if="loader"><span class="loader"></span></div>
                                    <button @click="confirmarIngreso()"  v-if="entrada.estado == 'no-ingreso' && !loader" class="uppercase bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                        Confirmar Ingreso
                                    </button> 
								</div>
								<!-- <div class="flex flex-col ml-auto">
                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Button
                                    </button>
								</div> -->
							</div>
							
							<div class="border-b border-dashed border-b-2  pt-2">
								<div class="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
								<div class="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
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
            scaner: false,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2ODM4MzUzMTksImV4cCI6MTY4MzkyMTcxOSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjQ1ZDNiZGUzZjY5Y2IwY2E5MTBiODJkIiwianRpIjoiNjU0NjBkMjctN2IxZC00ZDc2LTkwZDAtZmUzZDlmZTI5NzJiIn0.fhFPyewJQBoBmJMM81cXimZJwpLY119ZVNAOgJtfofU"
        }
    },
    methods: {
        confirmarIngreso(){
            this.modal = true
        },
        async confirmar(){
            this.modal = false
            this.loader = true
            
            axios.patch('https://apiauramanager.alguientiene.com/entradas/' + this.$route.params.id, {
            // axios.patch('http://192.168.1.8:5050/entradas/' + this.$route.params.id, {
                estado: 'ingreso'
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

        },
        cancelar(){

            this.modal = false
            // this.$router.push({ name: 'entradas' })
        },

        getEntrada() {
            axios.get('https://apiauramanager.alguientiene.com/entradas/' + this.$route.params.id,
                { 
                    headers: { 'Authorization': 'Bearer ' + this.token } 
                })
                .then(response => {
                    this.entrada = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    mounted() {
        this.getEntrada()
        // this.getEntrada()
        console.log('ruta', this.$route.params.id)
    }
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
    </style>