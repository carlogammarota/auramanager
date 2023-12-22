<template>
    <div>

        <div class="flex justify-center items-center bg-gray-100 py-12" v-if="ventaDeEntradas">
            <div v-if="loader"><span class="loader"></span></div>
            <div v-if="!loader" class=" rounded ">



                <!-- <h1 class="text-2xl font-bold mb-4">Información de Pago</h1> -->
                <div class="border p-4 border-dashed border-purple-300">
                    <!-- <h2 class="text-2xl font-bold">Comprar Ticket</h2> -->
                    <img src="@/assets/logo.png" class=" mx-auto" style="width:300px !important;"></img>


                    <!-- <h1 class="text-2xl font-bold">Aura Productora</h1> -->
                    <h1 class="text-2xl">PRESENTA</h1>
                    <img src="@/assets/flayer.jpeg" class=" mx-auto my-8" style="width:300px !important;"></img>
                    <p class="mb-4"> Lunes 1 de Enero 01:00hs am</p>
                    <p class="text-2xl font-bold mb-4">CLUB BALUMBA</p>
                    <Mapa />
                    <br class=""> Pueyrredón 973, X5184 <br> Capilla del Monte, Córdoba</p>
                    <div class="my-8">
                        <div class="my-8">
                            <h1 class="text-2xl">PRECIO</h1>
                            <h1 class="font-bold text-2xl">$2000</h1>
                            <h1 class="mt-2">Ticket</h1>
                        </div>

                    </div>
                </div>
                <!-- <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0"> -->



                <!-- </div> -->
                <!-- <p>Ticket con +1 Consumición</p> -->

                <!-- <div class="mt-8 pb-4 w-full">

                    <button @click="generarLink()"
                        class="py-2 px-4 rounded text-white font-semibold text-center btn-comprar bg-green-500 w-full">
                        Comprar Ticket
                    </button>
                </div> -->
                <div class="checkout-container mt-8 mb-8 border border-dashed bg-purple-100 rounded">
                    <img src="@/assets/mercadopago.webp" class=" mx-auto my-8 mt-24" style="width:150px !important;"></img>
                    <p class="text-2xl my-4">Tickets</p>

                    <div class="quantity-container">

                        <div>
                            <button @click="restar()" class="quantity-button px-4" type="button">
                                <i class="fas fa-minus-circle text-4xl"></i>
                            </button>
                            <span class="text-5xl ">{{ cantidadDeTickets }}</span>
                            <button @click="sumar()" class="quantity-button px-4" type="button">
                                <i class="fas fa-plus-circle text-4xl"></i>
                            </button>
                        </div>
                    </div>

                    <div class="total-text">
                        <span class="text-3xl">Total: ${{ total }}</span>
                    </div>
                    <div class="mb-4 mt-8">
                        <label class="block text-gray-700 text-sm font-bold mb-2 mt-2" for="username">
                            Email
                        </label>
                        <input v-model="email"
                            class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
                            id="username" type="email" placeholder="tuemail@gmail.com">

                            <!-- nombre y appelido inputs -->

                            <div  v-for="(item, index) in cantidadDeTickets" :key="index">
                             <label class="block text-gray-700 text-sm font-bold mb-2 mt-2" for="username">
                            Nombre y Apellido (Persona {{index + 1}})
                            </label>
                            <input v-model="participantes[index]"
                                class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
                                id="fullname" type="text" placeholder="Jorge Guevara">
                            </div>

                            <!-- {{participantes}} -->

                            



                            

                        
                            
                    </div>
                    <div class="px-12 w-full">
                        <button class="buy-button bg-purple-500 mb-24 px-4 d-block w-full" @click="generarLink()">
                            <!-- <i class="fas fa-mobile-alt buy-button-icon text-2xl"></i> -->
                            <span>Comprar Tickets</span>
                        </button>
                    </div>
                </div>
                <Ayuda class="mt-12 bg-gray-300 p-4 rounded" />
            </div>
        </div>

        <div v-if="!ventaDeEntradas">
            <!-- generar en tailwindcss un mensaje que diga que no hay entradas disponibles -->
            <div class="h-screen m-auto mt-24">
                <p class="text-2xl font-bold ">La venta de entradas no esta disponible</p>
            </div>
        </div>
    </div>
</template>
<script>
import Mapa from "@/components/Mapa.vue";
import axios from "axios";
import Ayuda from "@/components/Ayuda.vue";
export default {
	name: "venta-de-entradas",
	data() {
		return {
			ventaDeEntradas: true,
			linkDePago: "",
			loader: false,
			cantidadDeTickets: 1,
			email: "",
			total: 2000,
            participantes: [],
		};
	},
	async mounted() {},
	methods: {
		sumar() {
			this.cantidadDeTickets++;
		},
		restar() {
			if (this.cantidadDeTickets > 1) {
				this.cantidadDeTickets--;
			}
		},
		async generarLink() {
			// console.log('generarLink');
			//comprobar si es un email valido
			// console.log('this.email', this.email);
			let comprobacionEmail = this.email.includes("@");

			//si cantidad de tickets es mayor a 0 y email no es null

			if (this.cantidadDeTickets > 0 && comprobacionEmail) {
				this.loader = true;

          

				//produccion
				// axios.post('https://api.aura-producciones.com/generar-link', {
				//test
				axios
					.post("http://localhost:5050/generar-link", {
						cantidad: this.cantidadDeTickets,
						email: this.email,

						//hay que cambiar esto a un array de objetos
						participantes: this.participantes,
					})
					.then(
						(response) => {
							this.loader = false;
							console.log("response", response.data);
							this.linkDePago = response.data;
							// window.open(this.linkDePago, '_blank');
							//redirigir en la misma pagina
							window.location.href = this.linkDePago;
						},
						(error) => {
							console.log("error", error);
							this.loader = false;
						}
					);
				return;
			}
			if (this.cantidadDeTickets == 0) {
				alert("Debe ingresar una cantidad de tickets");
				return;
			}
			if (!comprobacionEmail) {
				alert("Debe ingresar un email valido");
				return;
			}
			if (this.email == "") {
				alert("Debe ingresar un email");
				return;
			}


			// if (this.email == '') {
			//     alert('Debe ingresar un email');
			//     return;
			// }

			// console.log('linkDePago', linkDePago);
		},
	},
	watch: {
		cantidadDeTickets: function (val) {
			this.total = val * 2000;
		},
	},
	components: {
		Ayuda,
		Mapa,
	},
};
</script>
<style>
body {
	font-family: Arial, sans-serif;
	font-size: 18px;
}

.checkout-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.quantity-container {
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
}

.quantity-text {
	margin-right: 0.5rem;
}

.quantity-button {
	color: #888;
	background: none;
	border: none;
	font-size: 24px;
	cursor: pointer;
}

.total-text {
	margin-bottom: 1rem;
}

.buy-button {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem 1rem;
	background-color: #3b82f6;
	color: #fff;
	border-radius: 0.25rem;
	cursor: pointer;
}

.buy-button-icon {
	margin-right: 0.5rem;
}

.loader {
	width: 48px;
	height: 48px;
	border: 5px solid #fff;
	border-bottom-color: #ff3d00;
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