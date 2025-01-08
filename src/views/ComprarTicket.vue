<template>
	<div>
		<div class="flex flex-col items-center justify-center bg-black py-10" v-if="publica">
			<!-- Contenedor del mensaje con Tailwind -->
			<div class="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
				<div class="flex justify-center items-center mb-4">
					<!-- Ícono de FontAwesome -->
					<i class="fas fa-gift text-4xl text-green-400 mr-4"></i>
					<h2 class="text-3xl font-semibold text-white">¡Oferta Especial!</h2>
				</div>

				<p class="text-lg text-gray-300 mb-4">
					Esta es una oferta especial de la mano de
					<span class="font-bold text-blue-400">{{ publica }}</span>
				</p>
			</div>
		</div>

		<div class="flex justify-center items-center bg-black py-12" v-if="ventaDeEntradas">
			<div v-if="loader"><span class="loader"></span></div>
			<div v-if="!loader" class="rounded">
				<div class="border p-6 border-dashed border-gray-600 rounded-lg">
					<!-- Logo -->
					<img src="@/assets/logoAztecNegro.png" alt="Logo Aztec" class="mx-auto w-52 mb-4" />

					<!-- Flyer -->
					<img src="@/assets/flayer_aztec.jpg" alt="Flayer Aztec" class="mx-auto my-6 w-72" />

					<!-- Fecha y Lugar -->
					<p class="text-lg text-gray-300 flex items-center justify-center mb-2">
						<i class="fas fa-calendar-alt text-purple-400 mr-2"></i> Viernes 10 de Enero, 00 HS
					</p>
					<p class="text-2xl font-bold text-center mb-2 text-purple-400">VALPISA</p>
					<p class="text-lg text-gray-300 flex items-center justify-center mb-2">
						<i class="fas fa-map-marker-alt text-red-400 mr-2"></i>
						Diag. Buenos Aires 102, X5184 Capilla del Monte, Córdoba
					</p>

					<!-- Mapa -->
					<Mapa />

					<!-- Precio -->
					<div class="text-center my-8">
						<h1 class="text-2xl text-white flex items-center justify-center mb-2">
							<i class="fas fa-tag text-green-400 mr-2"></i> PRECIO
						</h1>
						<h1 class="font-bold text-2xl text-purple-400 mb-2">$8000</h1>
						<p class="text-lg text-gray-300">x Ticket</p>
					</div>
				</div>

				<!-- Checkout -->
				<div class="checkout-container mt-8 mb-8 border border-dashed bg-gray-800 rounded">
					<img src="@/assets/mercadopago.webp" class="mx-auto my-8 mt-24" style="width:150px !important;" />

					<p class="text-2xl text-white my-4">Tickets</p>

					<div class="quantity-container text-center">
						<button @click="restar()" class="quantity-button px-4" type="button">
							<i class="fas fa-minus-circle text-4xl text-gray-300"></i>
						</button>
						<span class="text-5xl text-white">{{ cantidadDeTickets }}</span>
						<button @click="sumar()" class="quantity-button px-4" type="button">
							<i class="fas fa-plus-circle text-4xl text-gray-300"></i>
						</button>
					</div>

					<div class="total-text text-center mt-4">
						<span class="text-3xl text-white">Total: ${{ total }}</span>
					</div>

					<div class="mb-4 mt-8 px-8">
						<label class="block text-gray-300 text-sm font-bold mb-2" for="username">
							Email
						</label>
						<input v-model="email"
							class="shadow appearance-none border rounded w-full py-3 px-3 bg-gray-900 text-white leading-tight focus:outline-none focus:shadow-outline text-center"
							id="username" type="email" placeholder="tuemail@gmail.com" />

						<!-- Nombre y Apellido -->
						<div v-for="(item, index) in cantidadDeTickets" :key="index" class="mt-4">
							<label class="block text-gray-300 text-sm font-bold mb-2" for="fullname">
								Nombre y Apellido (Persona {{ index + 1 }})
							</label>
							<input v-model="participantes[index]"
								class="shadow appearance-none border rounded w-full py-3 px-3 bg-gray-900 text-white leading-tight focus:outline-none focus:shadow-outline text-center"
								id="fullname" type="text" placeholder="Jorge Guevara" />
						</div>
					</div>

					<div class="px-12 w-full mt-8">
						<button class="buy-button bg-purple-500 mb-24 px-4 d-block w-full text-white font-bold py-3 rounded"
							@click="generarLink()">
							<span>Comprar Tickets</span>
						</button>
					</div>
				</div>

				<Ayuda class="mt-12 bg-gray-700 p-4 rounded text-gray-300" />
			</div>
		</div>

		<div v-if="!ventaDeEntradas">
			<p class="text-white">Se cerró la venta de anticipadas.</p>
			<div class="h-screen m-auto mt-24 text-center">
				<p class="text-2xl font-bold text-white">La venta de entradas no está disponible</p>
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
			total: 8000,
			participantes: [],
			publica: ''
		};
	},
	async mounted() {
		// http://localhost:3322/comprar?publica=charlyg
		const urlParams = new URLSearchParams(window.location.search);
		const publica = urlParams.get("publica");
		this.publica = publica;
	},
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
				// axios.post('https://api.charlygproducciones.com/generar-link', {
				//test
				axios
					.post("https://api.charlygproducciones.com/generar-link", {
						cantidad: this.cantidadDeTickets,
						email: this.email,

						//hay que cambiar esto a un array de objetos
						participantes: this.participantes,
						publica: this.publica,
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
			this.total = val * 8000;
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