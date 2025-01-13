<template>
  <div>
    <div class="w-24">
      <!-- {{ getTokenString }} -->
    </div>
    <!-- {{ getTokenString }} -->
    <div class="background-container relative">
      <!-- {{ getTokenString }} -->
      <img src="@/assets/auraBlanco.png" alt="Logo" class="mr-2 absolute" style="bottom: 10px;" />


      <div class="content hidden">
        <!-- Aquí puedes añadir contenido al div -->

        <h1>Contenido del Div</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  mounted() {
    this.$store.dispatch('checkToken');
  },
  computed: {
    ...mapGetters(['getUser', 'getTokenString'])
  },
}
</script>

<style scoped>
.background-container {
  background-image: url('@/assets/aura_home.jpg');
  background-size: cover;
  /* Ajusta la imagen para cubrir todo el contenedor */
  background-position: center;
  /* Centra la imagen */
  background-repeat: no-repeat;
  /* Evita que la imagen se repita */
  height: 100vh;
  /* Ocupa toda la altura de la pantalla */
  display: flex;
  /* Opcional: Para centrar el contenido */
  align-items: center;
  /* Centrado vertical */
  justify-content: center;
  /* Centrado horizontal */
}

.content {
  background: rgba(0, 0, 0, 0.5);
  /* Fondo semitransparente opcional */
  color: white;
  /* Color del texto */
  padding: 20px;
  border-radius: 10px;
  /* Bordes redondeados opcionales */
  text-align: center;
  /* Centrado del texto */
}
</style>
