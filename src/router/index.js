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
        meta: { auth: false },
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
        component: Home,
        meta: { auth: true },
      },
      {
        name: "entrada",
        path: "entrada",
        component: Entrada,
        meta: { auth: true },
      },
      {
        name: "login",
        path: "login",
        component: LoginView,
        meta: { auth: false },
      },
      {
        path: "entradas/:id",
        name: "_id",
        component: _id,
        meta: { auth: true },
      },
      {
        path: "gracias/:id",
        name: "gracias",
        component: Gracias,
        meta: { auth: false },
      },
      {
        path: "publicas",
        name: "publicas",
        component: publicas,
        meta: { auth: false },
      },
      {
        path: "barra",
        name: "barra",
        component: () =>
          import(/* webpackChunkName: "barra" */ "../views/Barra.vue"),
        meta: { auth: true },
      },
    ],
  },
  {
    path: "/comprar",
    name: "comprar",
    component: ComprarTicket,
    meta: { auth: true }, // Requiere autenticación
  },
  {
    path: "/autologin",
    name: "autologin",
    component: Autologin,
  },
];

const router = new VueRouter({
  mode: "history", // Asegúrate de que tu servidor maneje el modo history correctamente
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = store.getters.getTokenString;
  const user = store.getters.getUser;
  const permissions = user ? user.permissions : [];

  console.log(`Navigating to: ${to.name}, Auth required: ${to.meta.auth}`);
  console.log(`Token: ${token}, User: ${JSON.stringify(user)}`);

  if (to.meta.auth && !token) {
    console.log("Redirecting to radio due to missing token");
    if (["radio", "comprar"].includes(to.name)) {
      next();
    } else {
      next({ name: "radio" });
    }
  } else {
    if (to.meta.auth && permissions) {
      if (!permissions.includes("admin") && !permissions.includes("entrada")) {
        console.log("Redirecting to radio due to missing permissions");
        next({ name: "radio" });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});


export default router;
