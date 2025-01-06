<template>
    <div>
        <!-- {{ getToken }} -->
        <div class=" flex-box flex h-screen">

            <div
                class="flex w-full pt-48  bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden lg:block ">

                <div class="hidden lg:block ">

                    <h1 class="text-white font-bold text-4xl font-sans">Aura Productora</h1>

                    <p class="text-white mt-1">El Administrador para manejar los QR de la entrada</p>

                    <button type="submit" disabled v-if="false"
                        class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Login</button>

                </div>

            </div>

            <div class="flex w-full  justify-center items-center bg-white ">

                <form class="bg-white" onsubmit="event.preventDefault()">

                    <!-- <h1 class="text-gray-800 font-bold text-2xl mb-1">Admin</h1> -->

                    <img src="@/assets/logo.png" class=" mx-auto mb-4" style="width:300px !important;"></img>



                    <!-- <p class="text-sm font-normal text-gray-600 mb-7">Usuario y Contraseña </p> -->

                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">

                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">

                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />

                        </svg>

                        <input v-model="email" class="pl-2 outline-none border-none" type="text" name="" id=""
                            placeholder="Email" />

                    </div>

                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl">

                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">

                            <path fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd" />

                        </svg>

                        <input v-model="password" class="pl-2 outline-none border-none" type="password" name="" id=""
                            placeholder="Contraseña" />

                    </div>

                    <button class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                        @click="login()">Login</button>

                    <!-- <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span> -->

                </form>

            </div>

        </div>

    </div>
</template>
<script>
import axios from 'axios'
import store from '../store'
export default {
    name: 'Login',
    data() {
        return {
            email: 'entrada@aura.com',
            password: '',
            error: '',
            loading: false
        }
    },
    methods: {
        async login() {
            this.loading = true
            try {
                const res = await axios.post('https://api.charlygproducciones.com/authentication', {
                    // const res = await axios.post('http://192.168.1.8:5050/authentication', {
                    "strategy": "local",
                    email: this.email,
                    password: this.password
                })
                this.loading = false;
                console.log("token", res.data.accessToken)
                console.log("RES", res)
                //hay que guardarlo en el store
                this.$store.dispatch('setToken', res.data.accessToken);
                this.$store.dispatch('setUser', res.data.user);

                this.$router.push('/')
            } catch (error) {
                alert('Usuario o Contraseña incorrecta')

                // this.error = error.response.data.error
                console.log(error)
                this.loading = false;
            }
        }
    },
    computed: {
        getToken() {
            return this.$store.getters.getToken
        }
    }

}
</script>