<template>
  <div class="home">
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-if="eliminarTicketModal">

<div class="fixed inset-0 bg-black/50 transition-opacity" aria-hidden="true"></div>

<div class="fixed inset-0 z-10 w-screen overflow-y-auto" >
  <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 bg-black"  >

    <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
            <svg class="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 class="text-base font-semibold text-gray-900" id="modal-title">Eliminar Ticket</h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">Estás seguro que deseas eliminar este ticket? Esta acción no se puede deshacer.</p>
            </div>
            <!-- {{ ticket_seleccionado }} -->
             <div class="p-4 bg-gray-200 shadow">
              <p>Id: {{ ticket_seleccionado._id }}</p>
              <p>Nombre: {{ ticket_seleccionado.fullname }}</p>
              <p>Publica: {{ ticket_seleccionado.publica }}</p>
              <p>Estado: {{ ticket_seleccionado.estado }}</p>
             </div>

          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" @click="eliminar()">Eliminar</button>
        <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
      </div>
    </div>
  </div>
</div>
</div>

<div class="p-6 bg-gray-100 rounded-lg shadow-lg mt-4">
    <h2 class="text-1xl font-semibold text-gray-800">Administración de la Entrada</h2>
</div>


    <div class="flex flex-col justify-center items-center" v-if="getToken">
      <div class="container mx-auto p-6">
       

        <div class="flex flex-col items-center mt-12">
          <!-- Escáner QR -->
          <QrScaner v-if="scaner" />

          <!-- Botón "Escanear QR" -->
          <button v-if="!scaner" @click="scaner = true"
            class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg flex items-center space-x-3 shadow-md transition-all duration-300">
            <i class="fas fa-qrcode text-2xl"></i>
            <span>Escanear QR</span>
          </button>

          <!-- Botón "Cerrar Escáner" -->
          <button v-if="scaner" @click="scaner = false"
            class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg flex items-center space-x-3 shadow-md mt-4 transition-all duration-300"
            style="z-index: 10000;">
            <i class="fas fa-times-circle text-2xl"></i>
            <span>Cerrar Escáner</span>
          </button>
        </div>

        


        <!-- Formulario Manual -->
        <div class="my-12 flex flex-col items-center ">
          <!-- Contenedor del formulario -->
          <div class="w-full max-w-lg bg-white p-6 rounded-lg shadow-md border-solid border-2">
            <!-- Título del formulario -->
            <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">
              Carga una entrada manualmente
            </h2>
            <!-- Campo de entrada -->
            <input type="text" v-model="nuevaEntrada.fullname" placeholder="Nombre Completo"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-800 shadow-sm mb-4" />
            <!-- Botón -->
            <button @click="cargarEntradaManualmente"
              class="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 rounded-lg shadow-md transition-all duration-300 flex justify-center items-center space-x-2">
              <i class="fas fa-save text-lg"></i>
              <span>Cargar Entrada</span>
            </button>
          </div>
        </div>

 <!-- Panel de Tickets -->
<div class="mt-8">
  <div class="p-6 border-2 border-[#221274] rounded-lg shadow-lg hover:shadow-xl transition-shadow">
    <div class="rounded-md text-white mb-6 py-2 text-center font-bold text-lg" style="background: #221274;">
      Tickets
    </div>
    <div class="flex flex-col md:flex-row items-center justify-between md:justify-around">
      <!-- Sección de "Ingresaron" -->
      <div class="text-center mb-4 md:mb-0">
        <div class="text-xl text-green-600 font-semibold px-2">Ingresaron</div>
        <div class="text-3xl font-bold text-green-600">{{ ingresaron }}</div>
      </div>
      <!-- Sección de "No Ingresaron" -->
      <div class="text-center mb-4 md:mb-0">
        <div class="text-xl text-yellow-500 font-semibold">No Ingresaron</div>
        <div class="text-3xl font-bold text-yellow-500">{{ noIngresaron }}</div>
      </div>
    </div>
  </div>
</div>


      </div>



      <!-- TICKETS -->
      <div>
        <h3 class="mt-6 text-3xl font-bold">Tickets</h3>
        <div class="flex flex-col mt-6 mb-24">
          <div class="relative w-full mb-8">
            <input type="search" v-model="searchTerm"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Buscador de Tickets" required />
            <button type="submit"
              class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700">
              <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Publica</th>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(item, index) in filteredEntries" :key="index" class="transition-all hover:bg-gray-100">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <img class="w-10 h-10 rounded-full"
                        src="https://w7.pngwing.com/pngs/893/183/png-transparent-user-avatar-profile-person-man-people-account-instagram-icon.png"
                        alt="Avatar" />
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ item.fullname }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">{{ item.publica }}</td>
                  <td class="px-6 py-4">
                    <span v-if="item.estado === 'no-ingreso'"
                      class="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                      No Ingreso
                    </span>
                    <span v-else-if="item.estado === 'ingreso'"
                      class="inline-flex px-2 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                      Ya Ingreso
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button @click="eliminarTicketModal = true; ticket_seleccionado = item"
                      class="text-red-600 hover:text-red-800 font-semibold cursor-pointer">Eliminar</button>
                  </td>



                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>

    

    <noAuth v-else />



  </div>
</template>


<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import noAuth from '@/components/noAuth.vue'
import QrScaner from '@/components/QrScaner.vue'
import axios from 'axios'
export default {
  name: "HomeView",
  data() {
    return {
      scaner: false,
      searchTerm: '',
      entradas: [],
      ingresaron: 0,
      noIngresaron: 0,
      ticket_seleccionado: null,
      nuevaEntrada: {
        "dni": null,
        "estado": "ingreso",
        "consumicion": false,
        "fullname": "",
        "publica": "Puerta Manual"
      },
      eliminarTicketModal: false
    };
  },
  methods: {
    cargarEntradaManualmente() {
      // console.log("cargarEntradaManualmente")

      //si nuevaEntrada.fullname esta vacio alerta
      if (this.nuevaEntrada.fullname === "") {
        alert("El nombre no puede estar vacio")
        return
      }


      axios.post('https://api-aura.armortemplate.com/entradas/', this.nuevaEntrada, {
        headers: {
          'Authorization': `Bearer ${this.getToken}`,
        },
      }).then(res => {
        alert("Entrada cargada correctamente")
        this.nuevaEntrada = {
          "dni": null,
          "estado": "ingreso",
          "consumicion": false,
          "fullname": this.nuevaEntrada.fullname,
          "publica": "Venta en puerta"
        }
        this.getEntradas()
      }).catch(err => {
        console.log(err)
      })


    },
    getEntradas() {
      axios.get('https://api-aura.armortemplate.com/entradas/', {
        headers: {
          'Authorization': `Bearer ${this.getToken}`,
        },
      }).then(res => {
        console.log(res.data)
        this.entradas = res.data.data

        //ingreso y no-ingreso
        this.ingresaron = this.entradas.filter(entrada => entrada.estado === 'ingreso').length
        this.noIngresaron = this.entradas.filter(entrada => entrada.estado === 'no-ingreso').length
      }).catch(err => {
        console.log(err)
      })
    },
    eliminar() {
      axios.delete(`https://api-aura.armortemplate.com/entradas/${this.ticket_seleccionado._id}`, {
        headers: {
          'Authorization': `Bearer ${this.getToken}`,
        },
      }).then(res => {
        alert("Entrada eliminada correctamente")
        this.eliminarTicketModal = false
        this.getEntradas()
      }).catch(err => {
        console.log(err)
      })
    }

  },
  mounted() {
    this.getEntradas()
  },
  components: {
    // HelloWorld,
    QrScaner,
    noAuth
  },
  computed: {
    getToken() {
      return this.$store.getters.getTokenString
    },
    getRole() {
      return this.$store.getters.getUser

    },
    filteredEntries() {
      console.log("filteredEntries")
      return this.entradas.filter(entrada => {
        return entrada.fullname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          entrada.publica.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          entrada.estado.toLowerCase().includes(this.searchTerm.toLowerCase())
        //  entrada.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      });

    }
    // getRole() {
    //   return this.$store.getters.getRole
    // },
  }

};
</script>
