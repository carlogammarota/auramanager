<template>
    <div>
        <p class="error">{{ error }}</p>
        <qrcode-capture></qrcode-capture>

        <!-- <p class="decode-result">Last result: <b>{{ result }}</b></p> -->
        <!-- boton encender flash -->
        <div class="w-full m-auto d-block my-4 flash">
            <button class="bg-blue-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="torchActive = true"
                v-if="!torchActive">Flash On</button>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="torchActive = false" v-if="torchActive">Flash Off</button>
        </div>
        <br>
        <p class="decode-result">Escanea el QR del la Entrada </p>



        <qrcode-stream @decode="onDecode" :torch="torchActive" @init="onInit" />
    </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {

    components: { QrcodeStream },

    data() {
        return {
            result: '',
            error: '',
            torchActive: false,
        }
    },

    methods: {
        onDecode(result) {
            this.result = result
        },

        async onInit(promise) {
            try {

                await promise
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    this.error = "ERROR: you need to grant camera access permission"
                } else if (error.name === 'NotFoundError') {
                    this.error = "ERROR: no camera on this device"
                } else if (error.name === 'NotSupportedError') {
                    this.error = "ERROR: secure context required (HTTPS, localhost)"
                } else if (error.name === 'NotReadableError') {
                    this.error = "ERROR: is the camera already in use?"
                } else if (error.name === 'OverconstrainedError') {
                    this.error = "ERROR: installed cameras are not suitable"
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error = "ERROR: Stream API is not supported in this browser"
                } else if (error.name === 'InsecureContextError') {
                    this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
                } else {
                    this.error = `ERROR: Camera error (${error.name})`;
                }
            }
        },

    },
    watch: {
        result: function (val) {
            console.log('nuevo resultado!', val)
            const sound = new Audio(require('@/assets/bep.mp3'))
            sound.play()
            this.$router.push({
                path: '/admin/entradas/' + val,
            })
        }
    }
}
</script>

<style scoped>
/* button {
    position: absolute;
    left: 10px;
    top: 10px;
} */

.flash {
    position: absolute;
    top: 140px;
    z-index: 1000000;
}

.error {
    color: red;
    font-weight: bold;
}

.error {
    font-weight: bold;
    color: red;
}
</style>
