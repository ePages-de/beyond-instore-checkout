import Vue from 'vue'
import router from './router'
import App from './App.vue'

import Vue2Storage from 'vue2-storage'
Vue.use(Vue2Storage);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import axios from "axios";
Vue.prototype.$axios = axios.create({ timeout: 5000 });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
