<template>
	<div>
		<main
			class="dark:bg-gray-800 bg-white relative overflow-hidden h-screen"
		>
			<header class="h-24 sm:h-32 flex items-center z-30 w-full" v-if="!getToken">
				<div
					class="container mx-auto px-6 flex items-center justify-between"
				>
					<div
						class="uppercase text-gray-800 dark:text-white font-black text-3xl"
					>
						<img src="logo.png" alt="Logo" class="w-24 mr-2" />
						<!-- AURA -->
					</div>
					<div class="flex items-center">
						<router-link
								to="/login"
								class=" uppercase py-1 px-2 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-sm cursor-pointer"
							>
								<i class="fa-solid fa-lock"></i>
								<p>ADMIN</p>
							</router-link>
					</div>
				</div>
			</header>
			<div
				class="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden mt-12"
			>
				<div class="container mx-auto px-6 flex relative py-2">
					<div class="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
						<!-- <span class="w-20 h-2 bg-gray-800 dark:bg-white mb-12">
						</span> -->
						<h1
							class="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800"
						>
							aura
							<span class="text-3xl sm:text-3xl">
								Producciones
							</span>
						</h1>
						<p
							class="text-sm sm:text-base text-gray-700 dark:text-white mt-2"
						>
							Descubre el epicentro de la música electrónica con
							Aura Producciones. Nos especializamos en crear
							experiencias sonoras inolvidables, llevando los
							eventos de música electrónica a un nivel superior.
							Con un enfoque innovador y una pasión ardiente por
							la música, transformamos cada evento en un viaje
							sensorial único.
						</p>
						<div class="flex mt-8 m-auto">
							<!-- <a href="#" class="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400">
                        <i class="fa-solid fa-calendar-days"></i>
                        Proximo Evento
                    </a> -->
							<router-link
								to="/comprar"
								class=" uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md hover:bg-pink-400 cursor-pointer"
							>
								<i class="fa-solid fa-calendar-days"></i>
								<p>Proximo Evento</p>
							</router-link>
							
						</div>
					</div>
					<div class="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
						<img
							src="https://www.tailwind-kit.com/images/object/10.png"
							class="max-w-xs md:max-w-sm m-auto"
						/>
					</div>
				</div>
			</div>
		</main>
		<footer class="bg-purple-900 py-4" v-if="!getToken">
			<div class="container mx-auto px-4 text-center">
				<div class="flex justify-between items-center">
					<p class="text-gray-300">
						&copy; 2024 Aura Producciones. Todos los derechos
						reservados.
					</p>
					<!-- <ul class="flex space-x-4">
            <li><a href="#"><i class="fab fa-facebook-f text-gray-300"></i></a></li>
            <li><a href="#"><i class="fab fa-twitter text-gray-300"></i></a></li>
            <li><a href="#"><i class="fab fa-instagram text-gray-300"></i></a></li>
          </ul> -->
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
export default {
    computed: {
        getToken() {
            return this.$store.getters.getToken
        },
        getRole() {
            return this.$store.getters.getUser
        },
  }
}
</script>