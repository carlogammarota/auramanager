<template>
  <div class="background-container">
    <div class="content hidden">
      <!-- Aquí puedes añadir contenido al div -->
      <h1>Contenido del Div</h1>
    </div>
  </div>
</template>

<style scoped>
.background-container {
  background-image: url('@/assets/aztec_home.jpg');
  background-size: cover; /* Ajusta la imagen para cubrir todo el contenedor */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  height: 100vh; /* Ocupa toda la altura de la pantalla */
  display: flex; /* Opcional: Para centrar el contenido */
  align-items: center; /* Centrado vertical */
  justify-content: center; /* Centrado horizontal */
}

.content {
  background: rgba(0, 0, 0, 0.5); /* Fondo semitransparente opcional */
  color: white; /* Color del texto */
  padding: 20px;
  border-radius: 10px; /* Bordes redondeados opcionales */
  text-align: center; /* Centrado del texto */
}
</style>
