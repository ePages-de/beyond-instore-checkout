import Vue from "vue";
import router from "./router";
import App from "./App.vue";

import Vue2Storage from "vue2-storage";
Vue.use(Vue2Storage);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas, far, fab); // see https://github.com/FortAwesome/vue-fontawesome#import-entire-styles
Vue.component("fa", FontAwesomeIcon);

import axios from "axios";
Vue.prototype.$axios = axios.create({ timeout: 5000 });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
