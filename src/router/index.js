import Vue from "vue";
import VueRouter from "vue-router";
import Entrada from "../views/Entrada.vue";
import _id from "../views/_id.vue";
Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: Entrada,
  },
  {
    path: "/entradas/:id",
    name: "_id",
    component: _id,
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
