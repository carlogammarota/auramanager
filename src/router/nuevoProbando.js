


import Vue from "vue";
import VueRouter from "vue-router";
import Entrada from "../views/Entrada.vue";
import _id from "../views/_id.vue";
import Gracias from "../views/Gracias.vue";
import ComprarTicket from "../views/ComprarTicket.vue";
import LoginView from "../views/LoginView.vue";
import Home from "../views/Home.vue";
// Suponiendo que tienes una store de Vuex
import store from '../store'; // Asegúrate de importar tu store de Vuex correctamente

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "entrada",
    path: "/entrada",
    component: Entrada,
  },
  {
    name: "comprar",
    path: "/comprar",
    component: ComprarTicket,
  },
  {
    name: "Login",
    path: "/login",
    component: LoginView,
  },
  // {
  //   name: "login",
  //   path: "/login",
  //   component: Login,
  // },
  {
    path: "/entradas/:id",
    name: "_id",
    component: _id,
  },
  // {
  //   path: "/barra/:id",
  //   name: "_id",
  //   component: _id,
  // },
  {
    path: "/gracias/:id",
    name: "gracias",
    component: Gracias,
  },
  {
    path: "/barra",
    name: "barra",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Barra.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Guardia global 'beforeEach'
router.beforeEach((to, from, next) => {
  // Lista de rutas que requieren autenticación
  const authRequiredRoutes = ['entrada', 'comprar', 'barra']; // Añade los nombres de las rutas que requieren autenticación

  // Verifica si la ruta a la que se accede requiere autenticación
  const requiresAuth = authRequiredRoutes.includes(to.name);

  // Verifica el estado de autenticación
  const isAuthenticated = store.state.token; // Asegúrate de que 'token' es el estado correcto en tu store

  if (requiresAuth && !isAuthenticated) {
    // Si la ruta requiere autenticación y el usuario no está autenticado, redirige a login
    next({ name: 'Login' });
  } else {
    // Si no se requiere autenticación o el usuario está autenticado, continúa con la ruta
    next();
  }
});

export default router;
