<template>
    <div class="flex flex-col space-y-4">
        <p>¿ Algun Problema ?</p>
        <button
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="openWhatsApp()">Contactar por WhatsApp</button>
        <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="sendEmail()">Enviar correo electrónico</button>
    </div>
</template>

<script>
export default {
    methods: {
        openWhatsApp() {
            // Lógica para abrir WhatsApp con el número o mensaje predefinido
            // Por ejemplo:
            window.location.href = 'https://wa.me/543548630543';
        },
        sendEmail() {
            // Lógica para enviar un correo electrónico
            // Por ejemplo, abrir el cliente de correo electrónico predeterminado:
            window.location.href = 'mailto:carlo.gammarota@gmail.com';
        }
    }
}
</script>

<style scoped>
/* Estilos de Tailwind CSS */
</style>