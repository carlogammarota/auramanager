import Vue from "vue";
import VueRouter from "vue-router";
import Entrada from "../views/Entrada.vue";
import _id from "../views/_id.vue";
import Gracias from "../views/Gracias.vue";
import ComprarTicket from "../views/ComprarTicket.vue";
import LoginView from "../views/LoginView.vue";
import Home from "../views/Home.vue";
import store from "../store"; // Importa tu store Vuex
import publicas from "../views/publicas.vue";
Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
    meta: { auth: true }, // Requiere autenticación
  },
  {
    name: "entrada",
    path: "/entrada",
    component: Entrada,
    meta: { auth: true }, // Requiere autenticación
  },
  {
    name: "comprar",
    path: "/comprar",
    component: ComprarTicket,
    meta: { auth: true }, // Requiere autenticación
  },
  {
    name: "login",
    path: "/login",
    component: LoginView,
    meta: { auth: false }, // No requiere autenticación
  },
  {
    path: "/entradas/:id",
    name: "_id",
    component: _id,
    meta: { auth: true }, // Requiere autenticación
  },
  {
    path: "/gracias/:id",
    name: "gracias",
    component: Gracias,
    meta: { auth: false }, // Requiere autenticación
  },
  {
    path: "/publicas",
    name: "publicas",
    component: publicas,
    meta: { auth: false }, // No requiere autenticación
  },
  {
    path: "/barra",
    name: "barra",
    component: () =>
      import(/* webpackChunkName: "barra" */ "../views/Barra.vue"),
    meta: { auth: true }, // Requiere autenticación
  },
  // {
  //   path: "*", // Ruta catch-all para 404
  //   name: "not-found",
  //   component: () => import("../views/NotFound.vue"),
  // },
];

const router = new VueRouter({
  mode: "history", // Asegúrate de que tu servidor maneje el modo history correctamente
  base: process.env.BASE_URL,
  routes,
});

// Guardia de navegación global
router.beforeEach((to, from, next) => {
  const token = store.getters.getTokenString; // Obtener el token desde el store
  if (to.meta.auth && !token) {
    // Si la ruta requiere autenticación y no hay token
    if (to.name === "comprar") {
      next(); // Permitir acceso a "comprar" sin redirigir
    } else {
      next({ name: "login" }); // Redirigir a la página de login
    }
  } else {
    next(); // Continuar con la navegación
  }
});

export default router;
