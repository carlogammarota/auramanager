import Vue from "vue";
import VueRouter from "vue-router";
import Entrada from "../views/Entrada.vue";
import _id from "../views/_id.vue";
import Gracias from "../views/Gracias.vue";
import ComprarTicket from "../views/ComprarTicket.vue";
import LoginView from "../views/LoginView.vue";
import Home from "../views/Home.vue";

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
    name: "login",
    path: "/login",
    component: LoginView,
  },
  {
    path: "/entradas/:id",
    name: "_id",
    component: _id,
  },
  {
    path: "/gracias/:id",
    name: "gracias",
    component: Gracias,
  },
  {
    path: "/barra",
    name: "barra",
    component: () =>
      import(/* webpackChunkName: "barra" */ "../views/Barra.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
