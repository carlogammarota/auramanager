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
import radio from "../views/Radio.vue";
import Autologin from "../views/Autologin.vue";
// Importa los layouts
import AdminLayout from "@/layouts/AdminLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import GraciasPorPatrocinar from "../views/GraciasPorPatrocinar.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: DefaultLayout, // Usa el layout "Site"
    children: [
      {
        name: "radio",
        path: "",
        component: radio, // Radio es ahora la página principal
        meta: { auth: false }, // No requiere autenticación
      },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout, // Usa el layout para el área de administración
    children: [
      {
        name: "home",
        path: "",
        component: Home, // Página principal del área admin
        meta: { auth: true, permissions: ['admin'] }, // Requiere autenticación y permisos de admin
      },
      {
        name: "entrada",
        path: "entrada",
        component: Entrada, // Página para gestionar entradas
        meta: { auth: true, permissions: ['entrada'] }, // Requiere autenticación y permisos de entrada
      },
      {
        name: "login",
        path: "login",
        component: LoginView, // Página de login
        meta: { auth: false }, // No requiere autenticación
      },
      {
        path: "entradas/:id",
        name: "_id",
        component: _id, // Vista dinámica para mostrar entradas específicas
        meta: { auth: true, permissions: ['admin', 'entrada'] }, // Requiere autenticación y permisos admin o entrada
      },
      {
        path: "publicas",
        name: "publicas",
        component: publicas, // Página de recursos públicos
        meta: { auth: false }, // No requiere autenticación
      },
      {
        path: "barra",
        name: "barra",
        component: () =>
          import(/* webpackChunkName: "barra" */ "../views/Barra.vue"), // Carga la vista de la barra de administración
        meta: { auth: true, permissions: ['admin'] }, // Solo accesible para admins
      },
    ],
  },
  {
    path: "/comprar",
    name: "comprar",
    component: ComprarTicket, // Página para comprar tickets
    meta: { auth: false }, // No requiere autenticación
  },
  {
    path: "/autologin",
    name: "autologin",
    component: Autologin, // Página para auto-login, posiblemente una redirección
    meta: { auth: false }, // No requiere autenticación
  },
  {
    path: "/gracias/:id",
    name: "gracias",
    component: Gracias, // Página de agradecimiento después de una compra o acción
    meta: { auth: false }, // No requiere autenticación
  },
  {
    path: "/gracias-patrocinar/:id",
    name: "gracias-patrocinar",
    component: GraciasPorPatrocinar, // Página de agradecimiento después de una compra o acción
    meta: { auth: false }, // No requiere autenticación
  },
];

const router = new VueRouter({
  mode: "history", // Asegúrate de que tu servidor maneje el modo history correctamente
  base: process.env.BASE_URL, // Base URL de la aplicación
  routes,
});

// Configuración de navegación antes de cada cambio de ruta
router.beforeEach((to, from, next) => {
  const token = store.getters.getTokenString; // Obtener token de autenticación desde Vuex
  const user = store.getters.getUser; // Obtener información del usuario desde Vuex
  const permissions = store.getters.getUser.permissions; // Obtener permisos del usuario desde Vuex

  // Si la ruta requiere autenticación
  if (to.meta.auth && !token) {
    return next({ name: 'login' }); // Redirige a la página de login si no hay token
  }

  // Verifica los permisos si la ruta los requiere
  if (to.meta.permissions) {
    const hasPermission = to.meta.permissions.some(permission => permissions.includes(permission));
    if (!hasPermission) {
      return next({ name: 'home' }); // Redirige a la página de inicio si no tiene permisos
    }
  }

  // Si todo está en orden, permitir navegación
  next();
});








export default router;
