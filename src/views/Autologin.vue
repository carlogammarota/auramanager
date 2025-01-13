<template>
    <div class="h-screen">
      <div class="">
        <!-- <span class="loader"></span> -->
        <Loading />
      </div>
      <!-- <p>Token: {{ token }}</p>
      <p>User ID: {{ userId }}</p> -->
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Loading from "../components/Loading.vue";
  import { mapActions } from "vuex";
  export default {
    data() {
      return {
        token: null,
        userId: null,
        loaderShow: true,
      };
    },
    async mounted() {
      this.fetchUrlParams();
    },
    components: {
      Loading,
    },
    methods: {
      //saveUser, saveToken
      ...mapActions(["saveToken", "saveUser"]),
  
      async fetchUrlParams() {
        const query = this.$route.query;
        console.log(query);
        this.token = this.$route.query.token;
        this.userId = this.$route.query.user_id;
  
        //si hay usuario se llama a la funcion traerUsuario
        // if (this.token) {
        this.traerUsuario();
        // }
      },
      async traerUsuario() {
        try {
          let user = await axios.get(
            `https://api-aura.armortemplate.com/users/${this.userId}`,
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          );
  
          user = user.data;
  
          this.saveUser(user);
          this.saveToken(this.token);
  
          //redircionar a la pagina de inicio
          this.$router.push("/");
  
          console.log(user);
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  <style>
  .loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8); /* Fondo negro con opacidad */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Asegura que esté por encima de todo */
  }
  
  .loader {
    position: relative;
    margin: auto;
    box-sizing: border-box;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.1);
    transform-origin: 50% 50%;
    transform: perspective(200px) rotateX(66deg);
    animation: spinner-wiggle 1.2s infinite;
  }
  
  .loader:before,
  .loader:after {
    content: "";
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 4px solid transparent;
    animation: spinner-spin 1.2s cubic-bezier(0.6, 0.2, 0, 0.8) infinite,
      spinner-fade 1.2s linear infinite;
  }
  
  .loader:before {
    border-top-color: #fff;
  }
  
  .loader:after {
    border-top-color: #ff3d00;
    animation-delay: 0.4s;
  }
  
  @keyframes spinner-spin {
    100% {
      transform: rotate(360deg);
    }
  }
  
  @keyframes spinner-fade {
    25%,
    75% {
      opacity: 0.1;
    }
    50% {
      opacity: 1;
    }
  }
  </style>
  