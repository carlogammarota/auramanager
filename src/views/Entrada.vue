<template>
  <div class="home">
    <div class="flex flex-col justify-center items-center" v-if="getToken">
      <div class="mt-8">
        <div class="p-4 transition-shadow border-2 border-[#221274] rounded-lg shadow-sm hover:shadow-lg">
          <div class="rounded-md text-white mb-4" style="background:#221274;">
            <p class="p-1">Tickets</p>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex flex-col text-center">
              <div class="text-2xl text-green-600">Ingresaron</div>
              <div class="text-4xl font-semibold text-green-600">{{ ingresaron }}</div>
              <div class="text-2xl text-yellow-400">No Ingresaron</div>
              <div class="text-4xl font-semibold text-yellow-700">{{ noIngresaron }}</div>
            </div>
          </div>
        </div>
      </div>

      <QrScaner v-if="scaner" />
      <button
        v-if="!scaner"
        @click="scaner = true"
        class="bg-[#221274] hover:bg-purple-700 text-white font-bold py-4 px-4 rounded-lg flex items-center space-x-2 mt-24"
      >
        <i class="fas fa-qrcode text-xl"></i>
        <span>Escanear QR</span>
      </button>
      <button
        v-if="scaner"
        @click="scaner = false"
        class="bg-[#221274] hover:bg-purple-700 text-white font-bold py-4 px-4 rounded-lg flex items-center space-x-2"
        style="z-index: 10000;"
      >
        <i class="fas fa-times-circle text-xl"></i>
        <span>Cerrar Escáner</span>
      </button>

      <div class="my-24">
        <FormulateInput
          placeholder="Nombre Completo"
          type="text"
          v-model="nuevaEntrada.fullname"
          label="Carga una entrada manualmente"
        />
        <button
          @click="cargarEntradaManualmente"
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-4 rounded-lg flex items-center space-x-2 mt-4 mx-auto"
        >
          <span>Cargar Entrada</span>
        </button>
      </div>

      <div>
        <h3 class="mt-6 text-xl">Tickets</h3>
        <div class="flex flex-col mt-6 mb-24">
          <div class="relative w-full mb-8">
            <input
              type="search"
              v-model="searchTerm"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Buscador de Tickets"
              required
            />
            <button
              type="submit"
              class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
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
                <tr
                  v-for="(item, index) in filteredEntries"
                  :key="index"
                  class="transition-all hover:bg-gray-100"
                >
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <img
                        class="w-10 h-10 rounded-full"
                        src="https://w7.pngwing.com/pngs/893/183/png-transparent-user-avatar-profile-person-man-people-account-instagram-icon.png"
                        alt="Avatar"
                      />
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ item.fullname }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">{{ item.publica }}</td>
                  <td class="px-6 py-4">
                    <span
                      v-if="item.estado === 'no-ingreso'"
                      class="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full"
                    >
                      No Ingreso
                    </span>
                    <span
                      v-else-if="item.estado === 'ingreso'"
                      class="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full"
                    >
                      Ya Ingreso
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">Eliminar</a>
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
      nuevaEntrada: {
          "dni": null,
          "estado": "ingreso",
          "consumicion": false,
          "fullname": "",
          "publica": "Puerta Manual (Toti)"
      }
    };
  },
  methods: {
    cargarEntradaManualmente(){
      // console.log("cargarEntradaManualmente")

      //si nuevaEntrada.fullname esta vacio alerta
      if(this.nuevaEntrada.fullname === ""){
        alert("El nombre no puede estar vacio")
        return
      }


      axios.post('http://localhost:1020/entradas/', this.nuevaEntrada, {
        headers: {
          'Authorization': `Bearer ${this.getToken}`,
        }, 
      }).then(res => {
        alert("Entrada cargada correctamente")
        this.nuevaEntrada = {
          "dni": null,
          "estado": "ingreso",
          "consumicion": false,
          "fullname": "",
          "publica": "Puerta Manual (Toti)"
        }
        this.getEntradas()
      }).catch(err => {
        console.log(err)
      })
      

    },
    getEntradas(){
        axios.get('http://localhost:1020/entradas/', {
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
