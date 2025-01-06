<template>
    <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Generar Entradas para el Evento</h2>
  
      <!-- Formulario para ingresar datos -->
      <form @submit.prevent="generateEntries" class="space-y-4 text-left">
        <div class="flex gap-4">
          <!-- <div class="flex-1">
            <label for="fullname" class="block text-sm font-bold text-gray-700">Nombre Completo</label>
            <input v-model="form.fullname" id="fullname" type="text" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div> -->
          <div class="flex-1">
            <label for="publica" class="block text-sm font-bold text-gray-700">Publica</label>
            <input v-model="form.publica" id="publica" type="text" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
        </div>
        <!-- <div class="flex gap-4">
          <div class="flex-1">
            <label for="dni" class="block text-sm font-bold text-gray-700">DNI</label>
            <input v-model="form.dni" id="dni" type="text" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" />
          </div>
          <div class="flex-1">
            <label for="consumicion" class="block text-sm font-bold text-gray-700">Consumición</label>
            <input v-model="form.consumicion" id="consumicion" type="checkbox" class="mt-1" />
          </div>
        </div> -->
        <div class="flex gap-4">
          <div class="flex-1">
            <label for="cantidad" class="block text-sm font-bold text-gray-700">Cantidad de Entradas</label>
            <input v-model="cantidad" id="cantidad" type="number" min="1" max="10" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
        </div>
        <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded-md">
          Generar Entradas
        </button>
      </form>
  
      <!-- Mostrar entradas generadas -->
      <div v-if="tickets.length > 0" class="mt-6">
        <h3 class="text-xl font-semibold mb-4">Entradas Generadas</h3>
        <ul class="space-y-2">
          <li v-for="ticket in tickets" :key="ticket._id" class="p-4 bg-gray-100 rounded-md flex justify-between items-center">
            <span>{{ ticket.fullname }} - {{ ticket.publica }}</span>
            <div class="flex gap-2">
              <a :href="`https://api.charlygproducciones.com/descargar-entradas/${ticket._id}`" class="text-blue-600 hover:underline">
                Ver Ticket
              </a>
              <button @click="copySingleLink(ticket._id)" class="text-green-600 hover:underline">
                Copiar Link
              </button>
            </div>
          </li>
        </ul>
        <button @click="copyLinks" class="mt-4 w-full py-2 bg-green-600 text-white rounded-md">
          Copiar Links de Todos los Tickets
        </button>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        dni: null,
        estado: 'no-ingreso',
        consumicion: false,
        fullname: '',
        publica: ''
      },
      cantidad: 1,
      tickets: [],
    };
  },
  methods: {
    async generateEntries() {
      // Limpiar entradas previas
      this.tickets = [];

      const requests = [];
      for (let i = 0; i < this.cantidad; i++) {
        const entry = { ...this.form };
        requests.push(axios.post('https://api.charlygproducciones.com/entradas', entry, {
          headers: {
            Authorization: `Bearer ${this.getToken}`,
          },
        }).catch(error => {
          console.error('Error generando entrada:', error);
        })
      ); // Enviar POST a la API
      }

      try {
        const responses = await Promise.all(requests); // Esperar todas las respuestas
        this.tickets = responses.map(response => response.data); // Extraer los datos
      } catch (error) {
        console.error('Error generando entradas:', error);
      }
    },
    copyLinks() {
      // Unir todos los links con un salto de línea entre cada uno
      const links = this.tickets.map(ticket => `https://api.charlygproducciones.com/descargar-entradas/${ticket._id}` + ' ').join('\n');
      navigator.clipboard.writeText(links).then(() => {
        alert('Los links de todos los tickets han sido copiados al portapapeles');
      });
    },
    copySingleLink(ticketId) {
      // Generar el enlace para el ticket individual
      const link = `https://api.charlygproducciones.com/descargar-entradas/${ticketId}`;
      navigator.clipboard.writeText(link).then(() => {
        alert('El link del ticket ha sido copiado al portapapeles');
      });
    },
  },
  computed: {
    getToken() {
      return this.$store.getters.getTokenString
    },
  },
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales si lo necesitas */
</style>
  
  <style scoped>
  /* Puedes agregar estilos adicionales si lo necesitas */
  </style>
  