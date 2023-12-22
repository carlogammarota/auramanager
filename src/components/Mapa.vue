<template>
    <div class="" style="height: 200px !important;">
        <div id="mapa" class="mapa-container"></div>
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
export default {
    name: 'Mapa',
    data() {
        return {
            mapboxgl: mapboxgl
        }
    },
    mounted() {
        const mapboxAccessToken = 'pk.eyJ1IjoiY2hhcmx5ZzQyMCIsImEiOiJja3g4N2hha2ExN2Q4Mm9xdTFwYndwY2VrIn0.JAqUQ1-ik2rlyT4Duj15ZA'

        const map = new this.mapboxgl.Map({
            container: 'mapa',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ -64.52661079805958, -30.86643741243709],
            zoom: 15,
            accessToken: mapboxAccessToken
        })

        new this.mapboxgl.Marker()
            .setLngLat([-64.52661079805958, -30.86643741243709])
            .addTo(map)
            .Popup()
            .setHTML('<h3>Información del marcador</h3><p>Aquí puedes agregar cualquier contenido adicional que desees mostrar.</p>');

    }
}
</script>

<style scoped>
#mapa {
    height: 180px;
}


.mapa-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.mapa-container .mapboxgl-marker {
    position: absolute;
    transform: translate(-50%, -50%);
}

</style></style>