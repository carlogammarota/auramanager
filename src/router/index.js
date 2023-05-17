import Vue from "vue";
import VueRouter from "vue-router";
import Entrada from "../views/Entrada.vue";
import _id from "../views/_id.vue";
import Gracias from "../views/Gracias.vue";
import ComprarTicket from "../views/ComprarTicket.vue";
import LoginView from "../views/LoginView.vue";
// import Login from "../components/Login.vue";
Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
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

export default router;
