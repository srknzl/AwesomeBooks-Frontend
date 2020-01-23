import Vue from "vue";
import App from "./App.vue";
import VueSidebarMenu from "vue-sidebar-menu";
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BootstrapVue from 'bootstrap-vue'
import "@fortawesome/fontawesome-free/css/all.css";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import vue2Touch from "vue2-touch-events";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import '../public/styles/global.scss'
// library.add(faUserSecret)
// Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueSidebarMenu);
Vue.use(BootstrapVue);
Vue.use(vue2Touch);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
