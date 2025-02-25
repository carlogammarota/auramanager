<template>
    <div class="container mx-auto py-12 px-6">
      <h2 class="text-4xl font-bold text-center mb-8 text-white animate__animated animate__fadeIn">
        Programación Semanal 📅
      </h2>
  
      <!-- Grilla de Programación -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(artista, index) in programacion" :key="index"
          :class="[
            'rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl',
            artista.tag === 'En Vivo' ? 'bg-gradient-to-r from-red-600 to-red-800' : 'bg-gradient-to-r from-green-600 to-green-800'
          ]">
          <div class="relative">
            <img :src="artista.imagenActual" alt="Artista"
              class="w-full h-64 object-cover">
            <div class="absolute inset-0 bg-black opacity-50"></div>
            <div
              :class="[
                'absolute top-2 right-1 text-white text-sm font-bold py-1 px-2 rounded-full shadow-lg animate__animated animate__fadeIn',
                artista.tag === 'En Vivo' ? 'bg-red-600' : 'bg-green-600'
              ]">
              {{ artista.tag === 'En Vivo' ? 'En Vivo' : 'Repetición' }}
            </div>
            <div class="absolute bottom-4 left-4 text-white text-left">
              <h3 class="text-xl font-bold">{{ artista.nombre }}</h3>
              <p class="text-sm">{{ artista.descripcion }}</p>
              <p class="text-sm">{{ artista.horarios }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        programacion: [
          {
            nombre: "Charly G",
            descripcion: "Todos los Viernes",
            horarios: "19:00 PM - 22:00 PM",
            imagenes: [
              "https://i.ibb.co/fdn2VVcM/CG001.jpg",
              "https://i.ibb.co/C3Cb13QV/charlyg2.png",
              "https://i.ibb.co/fdn2VVcM/CG003.jpg"
            ],
            imagenActual: "https://i.ibb.co/fdn2VVcM/CG001.jpg",
            intervalo: null,
            tag: "En Vivo",
          },
          {
            nombre: "Alan Caruso",
            descripcion: "Todos los Viernes",
            horarios: "19:00 PM - 22:00 PM",
            imagenes: [
              "https://i.ibb.co/C3PbVH86/alan1.jpg",
              "https://i.ibb.co/C3PbVH86/alan2.jpg",
              "https://i.ibb.co/C3PbVH86/alan3.jpg"
            ],
            imagenActual: "https://i.ibb.co/C3PbVH86/alan1.jpg",
            intervalo: null,
            tag: "En Vivo",
          },
          {
            nombre: "Alexander Troon",
            descripcion: "Todos los Viernes",
            horarios: "22:00 PM - 00:00 AM",
            imagenes: [
              "https://i.ibb.co/JjSTcq9w/Whats-App-Image-2025-02-25-at-2-43-35-PM.jpg",
            ],
            imagenActual: "https://i.ibb.co/JjSTcq9w/Whats-App-Image-2025-02-25-at-2-43-35-PM.jpg",
            intervalo: null,
            tag: "En Vivo",
          },
          {
            nombre: "El Capricorniano",
            descripcion: "Todos los Viernes",
            horarios: "22:00 PM - 00:00 AM",
            imagenes: [
              "https://i.ibb.co/XfjGXJQz/Whats-App-Image-2025-02-25-at-2-49-29-PM.jpg",
            ],
            imagenActual: "https://i.ibb.co/XfjGXJQz/Whats-App-Image-2025-02-25-at-2-49-29-PM.jpg",
            intervalo: null,
            tag: "En Vivo",
          },
          {
            nombre: "Aura Producciones",
            descripcion: "Club Balumba",
            horarios: "Todos los Domingos",
            imagenes: [
              "https://i.ibb.co/jnY7Yzy/lokito1.png",
              "https://i.ibb.co/jnY7Yzy/lokito2.png",
              "https://i.ibb.co/jnY7Yzy/lokito3.png"
            ],
            imagenActual: "https://i.ibb.co/jnY7Yzy/lokito1.png",
            intervalo: null,
            tag: "Repeticion",
          },
        ],
      };
    },
    created() {
      this.programacion.forEach((artista) => {
        artista.intervalo = setInterval(() => {
          let currentIndex = artista.imagenes.indexOf(artista.imagenActual);
          let nextIndex = (currentIndex + 1) % artista.imagenes.length;
          artista.imagenActual = artista.imagenes[nextIndex];
        }, 3000);
      });
    },
    destroyed() {
      this.programacion.forEach((artista) => {
        clearInterval(artista.intervalo);
      });
    },
  };
  </script>
  