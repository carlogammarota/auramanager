<template>
  <div class="home">
    <!-- <h1 class="text-3xl">Entrada</h1> -->
    <!-- {{ getRole }} -->


    <div class="flex flex-col justify-center items-center" v-if="getToken">
    <template class="">
              <div class="p-4 transition-shadow border border-[#221274] border-2 rounded-lg shadow-sm hover:shadow-lg mt-8">
                   <div class="rounded-md text-white mb-4" >
                    <p style="background:#221274;" class="p-1">Tickets</p>
                    <!-- <img style="width: 120px;" class="mt-2" src="https://www.gustoargentino.com/cdn/shop/files/Ginebra-Handcrafted-Dry-750ml-Aconcagua.jpg?v=1682600739" alt=""> -->
                  </div>
                <div class="flex items-start justify-between">
                
                  <div class="flex flex-col">
                    <span class="text-gray-400 text-2xl text-center text-green-600">Ingresaron </span>
                    <span class="text-4xl font-semibold p-0 m-0 text-left text-green-600 text-center">{{ingresaron}}</span>
                    <span class="text-gray-400 text-yellow-400 text-2xl text-center">No Ingresaron</span>
                    <span class="text-4xl font-semibold p-0 m-0 text-left text-yellow-700 text-center">{{noIngresaron}}</span>
                    <!-- <span class="text-gray-400 text-left">TOTAL RECAUDADO</span>
                    <span class="text-lg font-semibold p-0 m-0 text-left">$25.000 ARS</span> -->
                  </div>
             
                </div>
              </div>
            </template>
      <QrScaner v-if="scaner" />
      <button @click="scaner = true" v-if="!scaner" style="background:#221274;"
        class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-4 rounded-lg flex items-center space-x-2 mt-24">
        <i class="fas fa-qrcode text-xl"></i>
        <span class="text-sm">Escanear QR</span>
      </button>
      <button  @click="scaner = false" v-if="scaner" style="z-index: 10000; background:#221274;"
        class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-4 rounded-lg flex items-center space-x-2 d-block">
        <i class="fas fa-times-circle text-xl"></i>
        <span class="text-sm">Cerrar Escáner</span>
      </button>

      <div class="my-24">
        <FormulateInput placeholder="Nombre Completo" type="text" v-model="nuevaEntrada.fullname" label="Carga una entrada manualmente" />
        <button @click="cargarEntradaManualmente()" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-4 rounded-lg flex items-center space-x-2 mt-4 m-auto">
        <!-- <i class="fas fa-qrcode text-xl"></i> -->
        <span class="text-sm">Cargar Entrada</span>
      </button>

      </div>
      <div>
          <h3 class="mt-6 text-xl">Tickets</h3>
        
          <div class="flex flex-col mt-6 mb-24">
          <div class="relative w-full mb-8">
    <input type="search" v-model="searchTerm" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Buscador de Tickets" required="">
    
    <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
    </button>
</div>

            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div class="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
                  <table class="min-w-full overflow-x-scroll divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Nombre
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Publica
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Estado
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Acciones
                        </th>
                        <th scope="col" class="relative px-6 py-3">
                          <span class="sr-only">Eliminar</span>
                          <span class="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <template>
                        <tr class="transition-all hover:bg-gray-100 hover:shadow-lg" v-for="(item, index) in filteredEntries" :key="index">
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="flex-shrink-0 w-10 h-10">
                                <img
                                  class="w-10 h-10 rounded-full"
                                  src="https://w7.pngwing.com/pngs/893/183/png-transparent-user-avatar-profile-person-man-people-account-instagram-icon.png"
                                  alt=""
                                />
                              </div>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900 text-left">{{item.fullname}}</div>
                                <!-- <div class="text-sm text-gray-500">ahmed.kamel@example.com</div> -->
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 text-left">{{item.publica}}</div>
                            <!-- <div class="text-sm text-gray-500">Optimization</div> -->
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span v-if="item.estado === 'no-ingreso'"
                              class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                            >
                              No Ingreso
                            </span>
                            <span v-if="item.estado === 'ingreso'"
                              class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                            >
                              Ya Ingreso 
                            </span>
                            
                          </td>
                          <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">Admin</td>
                          <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <!-- <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a> -->
                            <a href="#" class="text-indigo-600 hover:text-indigo-900">Eliminar</a>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

      </div>
          
    </div>

    



    <!-- <div class="mx-8" v-if="getToken && false">
      <h1 @click="scaner = true" v-if="!scaner"
        class="text-3xl my-8 bg-base-400 p-2 border-2 border-black cursor-pointer">Escanear QR</h1>
      <QrScaner v-if="scaner" />
      <h1 @click="scaner = false" v-if="scaner"
        class="text-2xl my-4 bg-base-400 p-2 border-2 border-black cursor-pointer">Cerrar Scaner</h1>

    </div> -->


    <noAuth />



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


      axios.post('https://api.aura-producciones.com/entradas/', this.nuevaEntrada, {
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
        axios.get('https://api.aura-producciones.com/entradas/', {
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
