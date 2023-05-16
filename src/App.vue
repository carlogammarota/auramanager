<template>
  <div id="app">
    <!-- <Login></Login> -->
    <nav class="bg-purple-500">
      <h1 class="text-2xl font-bold text-white">AURA PRODUCTORA</h1>
      <div class="mt-4">

        <router-link to="/" class="uppercase bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">QR
          ENTRADA</router-link>
        <router-link to="/barra"
          class="ml-4 uppercase bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">QR BARRA</router-link>

      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
import Login from './components/Login.vue'
export default {

  components: {
    Login
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: black;
  background-color: rgb(33, 201, 33) !important;
}
</style>
