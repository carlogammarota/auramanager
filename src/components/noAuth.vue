<template>
    <div class="flex items-center justify-center h-screen bg-gray-200" v-if="!getToken">
        <div class="text-center">
            <h1 class="text-4xl font-bold mb-6">Necesitas autorización para ver esto</h1>
            <!-- <router-link to="/" class="uppercase bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">QR
            ENTRADA</router-link> -->
            <router-link to="/login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="w-6 h-6 inline-block mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3">
                    </path>
                </svg>
                Loguéate si eres administrador
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: "NoAuth",
    computed: {
        getToken() {
            return this.$store.getters.getToken
        }
    }
}
</script>