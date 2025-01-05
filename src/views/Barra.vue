<template>
  <div>
    <!-- Loading screen -->
    <!-- <div
        x-ref="loading"
        class="fixed inset-0 z-50 flex items-center justify-center text-white bg-black bg-opacity-50"
        style="backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px)"
      >
        Loading.....
      </div> -->
    <!-- {{ventas}} -->
    <!-- {{ventas}} -->
    <!-- {{getTokenString}} -->
    <div class="m-auto my-24" style="z-index: 100">
      <p>Nueva Venta</p>
      <button
        @click="modalVenta = true"
        class="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring"
      >
        <svg
          class="w-6 h-6 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      </button>
    </div>
    <!-- Modal Background -->
    <div
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      v-show="modalVenta"
    >
      <!-- Modal -->
      <div
        class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      >
        <!-- Modal Header -->
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl font-bold">Nueva Venta</p>
          <div class="cursor-pointer z-50" @click="modalVenta = false">
            <svg
              class="fill-current text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M11.245 9.012l6.255-6.255L16.243.757l-6.255 6.255-6.255-6.255L.75 2.757l6.255 6.255-6.255 6.255 1.745 1.745 6.255-6.255 6.255 6.255 1.745-1.745-6.255-6.255z"
              ></path>
            </svg>
          </div>
        </div>

        <!-- Modal Body -->
        <form>
          <div class="mb-4 text-left">
            <!-- <pre>{{ values }}</pre> -->
            <FormulateForm v-model="values">
              <FormulateInput
                type="group"
                name="tragos"
                :repeatable="true"
                add-label="+ Agregar Trago"
                validation="required"
                #default="{ index }"
              >
                <FormulateInput

                  type="select"
                  :options="{
                    'Seleccione una bebida': 'Seleccione una bebida',
                    'Gin Tonic 500ml': 'Gin Tonic 500ml',
                    'Gin Tonic 1L': 'Gin Tonic 1L',
                    'Fernet 500ml': 'Fernet 500ml',
                    'Fernet 1L': 'Fernet 1L',
                    'Smirnoff 500ml': 'Smirnoff 500ml',
                    'Smirnoff 1L': 'Smirnoff 1L',
                    'Cerveza Cordoba 473ml': 'Cerveza Cordoba 473ml',
                    'Cerveza Heineken 473ml': 'Cerveza Heineken 473ml',
                  }"
                  :label="`Nombre de el trago`"
                  name="nombre-trago"
                  validation="required"
                />

                <FormulateInput
                  type="select"
                  label="Cantidad"
                  name="cantidad"
                  :options="{
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                  }"
                  
                />

                <!-- Opcional sin precio -->
                <FormulateInput
                  type="checkbox"
                  label="Sin Precio"
                  name="sinPrecio"
                />

                <!-- Valor, ocultar si el checkbox esta activo -->
                <FormulateInput
                  type="text"
                  label="Valor ($)"
                  name="valor"
                  v-if="values.tragos[index] && !values.tragos[index].sinPrecio"
                />
                <FormulateInput
                  type="text"
                  label="Nombre"
                  name="nombre-cliente"
                  v-if="values.tragos[index] && values.tragos[index].sinPrecio"
                />

                <FormulateInput type="textarea" name="nota" label="Notas" />

                <!-- <FormulateInput type="submit" label="Enviar" /> -->
              </FormulateInput>
            </FormulateForm>
          </div>

          <!-- Submit Button -->
        </form>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          @click="cargarVenta"
        >
          Cargar Venta
        </button>
      </div>
    </div>

    <div class="flex flex-col flex-1 h-full overflow-hidden" v-show="false">
      <!-- Navbar -->
      <header class="flex-shrink-0 border-b">
        <div class="flex items-center justify-between p-2">
          <!-- Navbar right -->
          <div class="flex items-center space-x-3 m-auto">
            <div class="">
              <!-- Services Button -->
              <div class="m-auto" style="z-index: 100">
                <p>Nueva Venta</p>
                <button
                  @click="modalVenta = true"
                  class="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring"
                >
                  <svg
                    class="w-6 h-6 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <!-- Main content -->
      <div class="flex-grow container mx-auto sm:px-4 pt-6 pb-8">
        <div
          class="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6"
        >
          <div class="border-b px-6">
            <div class="flex justify-between -mb-px">
              <div class="text-blue-dark py-4 text-lg">Total Recaudado</div>
              <div class="lg:flex">
                <button
                  type="button"
                  class="appearance-none py-4 text-blue-dark border-b border-blue-dark mr-6"
                >
                  ARS
                </button>
              </div>
            </div>
          </div>
          <div class="lg:flex">
            <div class="w-1/3 text-center py-8">
              <div class="border-r">
                <div class="text-grey-darker mb-2">
                  <span class="text-3xl align-top"></span>
                  <span class="text-5xl">$25,000</span>
                </div>
                <div class="text-sm uppercase text-grey tracking-wide">
                  ARS peso Argentino
                </div>
              </div>
            </div>
            <!-- <div class="w-1/3 text-center py-8">
          <div class="border-r">
            <div class="text-grey-darker mb-2">
                <span class="text-3xl align-top">USD </span>
              <span class="text-5xl">$20</span>
            </div>
             <div class="text-sm uppercase text-grey tracking-wide">
              1 USD = 804.37 ARS
            </div>
          </div>
        </div>
        <div class="w-1/3 text-center py-8">
          <div>
              <div class="text-grey-darker mb-2">
                <span class="text-3xl align-top">EUR </span>
              <span class="text-5xl">$20</span>
            </div>
            <div class="text-sm uppercase text-grey tracking-wide">
              1 EUR = 886.62 ARS
            </div>
          </div>
        </div> -->
          </div>
        </div>
        <main class="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
          <!-- Main content header -->
          <div
            class="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row"
          >
            <h1 class="text-2xl font-semibold whitespace-nowrap">Dashboard</h1>
            <div class="space-y-6 md:space-x-2 md:space-y-0">
              BARRA CAJA
              <!-- <a
              href="https://kamona-wd.github.io/kwd-dashboard/"
              target="_blank"
              class="inline-flex items-center justify-center px-4 py-1 space-x-1 bg-red-500 text-white rounded-md shadow animate-bounce hover:bg-red-600"
            >
              <span>See Dark & Light version</span>
            </a> -->
            </div>
          </div>

          <!-- Start Content -->
          <div
            class="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <template>
              <div
                class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg"
              >
                <div class="flex items-start justify-between">
                  <div class="flex flex-col">
                    <span class="text-gray-400 text-left"
                      >Precio del Vaso 1L
                    </span>
                    <span class="text-lg font-semibold p-0 m-0 text-left"
                      >$5.000 ARS</span
                    >
                    <span class="text-gray-400">Cantidad Vendidos</span>
                    <span class="text-lg font-semibold p-0 m-0 text-left"
                      >5</span
                    >
                    <span class="text-gray-400 text-left">TOTAL</span>
                    <span class="text-lg font-semibold p-0 m-0 text-left"
                      >$25.000 ARS</span
                    >
                  </div>
                  <div class="rounded-md text-white">
                    <p style="background: #221274">GIN</p>
                    <img
                      style="width: 120px"
                      class="mt-2"
                      src="https://www.gustoargentino.com/cdn/shop/files/Ginebra-Handcrafted-Dry-750ml-Aconcagua.jpg?v=1682600739"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </template>
            <template>
              <div
                class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg"
              >
                <div class="flex items-start justify-between">
                  <div class="flex flex-col">
                    <span class="text-gray-400 text-left"
                      >Precio del Vaso 1L
                    </span>
                    <span class="text-lg font-semibold p-0 m-0 text-left"
                      >$5.000 ARS</span
                    >
                    <span class="text-gray-400">Cantidad Vendidos </span>
                    <span class="text-lg font-semibold p-0 m-0 text-left"
                      >10</span
                    >
                    <span class="text-gray-400 text-left">TOTAL</span>
                    <span class="text-lg font-semibold p-0 m-0 text-left"
                      >$50.000 ARS</span
                    >
                  </div>
                  <div class="rounded-md text-white">
                    <p style="background: black" class="px-2">FERNET</p>
                    <img
                      style="width: 77px"
                      class="mt-1"
                      src="https://d2r9epyceweg5n.cloudfront.net/stores/002/772/481/products/002-fernet-branca-7501-a3226144608c1d24ce16751984609192-640-0.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </template>
            <template>
              <div
                class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg"
              >
                <div class="flex items-start justify-between">
                  <div class="flex flex-col">
                    <span class="text-gray-400 text-left"
                      >Precio del Vaso 1L
                    </span>
                    <span class="text-lg font-semibold p-0 m-0 text-left"
                      >$5.000 ARS</span
                    >
                    <span class="text-gray-400">Cantidad Vendidos </span>
                    <span class="text-lg font-semibold p-0 m-0 text-left"
                      >4</span
                    >
                    <span class="text-gray-400 text-left">TOTAL</span>
                    <span class="text-lg font-semibold p-0 m-0 text-left"
                      >$20.000 ARS</span
                    >
                  </div>
                  <div class="rounded-md text-white">
                    <p style="background: #221274">Smirnoff</p>
                    <img
                      style="width: 103px"
                      class="mt-3"
                      src="https://tyna.com.ar//assets/archivos/recortadas/33035.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </template>
            <template>
              <div
                class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg"
              >
                <div class="flex items-start justify-between">
                  <div class="flex flex-col">
                    <span class="text-gray-400 text-left"
                      >Precio de lata 473ML
                    </span>
                    <span class="text-lg font-semibold p-0 m-0 text-left"
                      >$2.000 ARS</span
                    >
                    <span class="text-gray-400 text-left"
                      >Cantidad Vendidos</span
                    >
                    <span class="text-lg font-semibold p-0 m-0 text-left"
                      >5</span
                    >
                    <span class="text-gray-400 text-left">TOTAL</span>
                    <span class="text-lg font-semibold p-0 m-0 text-left"
                      >$10.000 ARS</span
                    >
                  </div>
                  <div class="rounded-md text-white">
                    <p style="background: #221274" class="px-2">Heineken</p>
                    <img
                      style="width: 50px"
                      class="mt-3"
                      src="https://http2.mlstatic.com/D_NQ_NP_705743-MLA53100334348_122022-O.webp"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- Table see (https://tailwindui.com/components/application-ui/lists/tables) -->

          <!-- hay que hacer ventas de los tragos ent iempo real creando un servicIO
          en feathers llamado ventas  -->

          <div class="flex flex-col mt-6" v-show="false">
            <h3 class="mt-6 text-xl">Ventas</h3>
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
              >
                <div
                  class="overflow-hidden border-b border-gray-200 rounded-md shadow-md"
                >
                  <table
                    class="min-w-full overflow-x-scroll divide-y divide-gray-200"
                  >
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Nombre del Trago
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Acciones
                        </th>
                        <th scope="col" class="relative px-6 py-3">
                          <span class="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <!-- {{ventas.}}tragos -->
                      <template>
                        <div
                          class="transition-all hover:bg-gray-100 hover:shadow-lg"
                          v-for="(venta, index) in ventas"
                          :key="index"
                        >
                          <tr v-for="(tragos, index) in venta" :key="index">
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="flex items-center">
                                <div class="ml-4">
                                  <div
                                    class="text-sm font-medium text-gray-900 text-left"
                                  >
                                    {{ tragos["nombre"] }}
                                  </div>
                                  <div class="text-sm text-gray-500">
                                    {{ venta.valor }}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </div>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import mapGetters from "vuex";
export default {
  data() {
    return {
      modalVenta: false,
      loading: true,
      isSidebarOpen: false,
      isSettingsPanelOpen: false,
      isSearchBoxOpen: false,
      formValues: {
        name: "Jenny Taylor",
        email: "jenny.taylor@example.com",
      },
      venta: {
        nombre: "Gin Tonic 1L",
        precio: 5000,
        cantidad: 5,
      },
      value: "",
      values: {
        tragos: [],
      },
      preciosBebidas: {
        "Gin Tonic 500ml": 3000,
        "Gin Tonic 1L": 4000,
        "Fernet 500ml": 3000,
        "Fernet 1L": 4000,
        "Smirnoff 500ml": 3000,
        "Smirnoff 1L": 4000,
        "Cerveza Cordoba 473ml": 1500,
        "Cerveza Heineken 473ml": 2000,
        // ... otros precios
      },
      ventas: [],
      // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2ODM4MzUzMTksImV4cCI6MTY4MzkyMTcxOSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjQ1ZDNiZGUzZjY5Y2IwY2E5MTBiODJkIiwianRpIjoiNjU0NjBkMjctN2IxZC00ZDc2LTkwZDAtZmUzZDlmZTI5NzJiIn0.fhFPyewJQBoBmJMM81cXimZJwpLY119ZVNAOgJtfofU"
    };
  },
  mounted() {
    this.traerVentas();
  },
  methods: {
    toggleSidbarMenu() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    async cargarVenta(data) {
      // await this.$axios.post('/my/api', data)
      //si esta en "Seleccionar una bebida" no cargar

      for (let i = 0; i < this.values.tragos.length; i++) {
        if (this.values.tragos[i]["nombre-trago"] == "Seleccione una bebida") {
          alert("Seleccione una bebida");
          return;
        }
      }

      axios
        .post(
          "http://localhost:1020/ventas-all/",
          // "http://localhost:1020/ventas/",
          this.values,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.ventas = response.data;
          this.modalVenta = false;
          alert("Venta cargada con exito");
        })
        .catch((error) => {
          alert("ERROR");
        });

      // alert(`Thank you, ${data.name}`);
    },
    traerVentas() {
      axios
        .get(
          "http://localhost:1020/ventas-all/",
          // axios.get("http://localhost:1020/ventas/",
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          console.log(response.data.data);

          this.ventas = response.data.data;
        });
    },
    actualizarValor(index) {
      //si es sin precio no actualizar valor
      //   if (this.values.tragos[index].sinPrecio) {
      //     //poner el valor nombre vacio
      //     this.values.tragos[index].nombre = "";
      //     return;
      //   }

      const bebidaSeleccionada = this.values.tragos[index].precio;
      const cantidadSeleccionada = this.values.tragos[index].cantidad;
      this.values.tragos[index].valor =
        this.preciosBebidas[bebidaSeleccionada] * cantidadSeleccionada;
    },

    // Otros métodos pueden ir aquí
  },
  computed: {
    token() {
      return this.$store.getters.getTokenString;
    },

    // getTokenString
    // ...mapGetters(["getTokenString"]),
  },

  // Otras opciones de Vue como computed, watch, etc., pueden ir aquí
};
</script>

<style>
/* Estilos CSS aquí */
.formulate-input-element select {
  width: 100%;
  height: 50px;
  padding: 11px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
