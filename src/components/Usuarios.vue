<template>
  <div class="p-4">
    <!-- Lista de imágenes de usuarios conectados -->
    <div class="flex flex-wrap gap-4">
      <div 
        v-for="(usuario, index) in usuarios_conectados" 
        :key="usuario._id || index" 
        class="relative flex items-center justify-center"
      >
        <!-- Icono verde de conexión -->
        <div 
          class="absolute top-0 left-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
        ></div>

        <!-- Imagen del usuario con tooltip (displayName) -->
        <img 
          v-if="usuario.imagen" 
          :src="usuario.imagen" 
          :alt="usuario.displayName || 'Usuario'" 
          :title="usuario.displayName" 
          class="w-12 h-12 rounded-full object-cover" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import socket from "@/plugins/socket";

export default {
  name: "Usuarios",
  data() {
    return {
      usuarios_conectados: [],
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken;
    },
    getRole() {
      return this.$store.getters.getUser;
    },
    ...mapGetters(["getUser", "getTokenString"]),
  },
  mounted() {
    if (this.getToken) {
      const user = this.getUser;
      socket.emit("join", { user: user });
      console.log("User ID enviado al servidor:", user);
    } else {
      console.warn("No hay token disponible.");
    }
    this.init();
  },
  methods: {
    init() {
      socket.on("updateUsers", (data) => {
        console.log("Usuarios conectados recibidos:", JSON.stringify(data, null, 2));
        this.usuarios_conectados = data;
      });
    },
  },
};
</script>

<style scoped>
/* Asegurar que el icono se mantenga visible sobre la imagen */
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.top-0 {
  top: 0;
}
.left-0 {
  left: 0;
}
.w-3 {
  width: 0.75rem;
}
.h-3 {
  height: 0.75rem;
}
.bg-green-500 {
  background-color: #22c55e; /* Verde */
}
.border-white {
  border-color: white;
}
.rounded-full {
  border-radius: 9999px;
}
</style>
