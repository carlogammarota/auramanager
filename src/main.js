import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import './assets/tailwind.css';

import VueFormulate from '@braid/vue-formulate'

import VueCookies from 'vue-cookies';


import Mapbox from 'mapbox-gl'
import VueMapbox from 'vue-mapbox'

Vue.use(VueMapbox, { mapboxgl: Mapbox })
Vue.use(VueFormulate)
Vue.use(VueCookies);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
