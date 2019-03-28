/* eslint-disable */
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

// configure axios, will be re-configured in App.vue
import axios from "axios";
Vue.prototype.$axios = axios.create({ timeout: 15000 });

// configure apollo
// https://vue-apollo.netlify.com/guide/installation.html#manual-installation
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-boost";
Vue.use(VueApollo);
const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: "https://beyond-instore-api.herokuapp.com/",
    request: async operation => {
      operation.setContext({
        headers: {
          "X-Beyond-API": `https://${
            router.currentRoute.params.shop
          }.beyondshop.cloud/api`
        }
      });
    }
  }),
  defaultOptions: {
    $query: {
      fetchPolicy: "cache-and-network"
    }
  },
  errorHandler(error) {
    console.log(
      "%cError",
      "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
      error.message
    );
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
