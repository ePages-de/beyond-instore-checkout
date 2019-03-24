<template>
  <div class="jumbotron">
    <Alerts :alerts="alerts" />

    <h3 class="text-center">Installing BEYOND Instore Checkout</h3>

    <p class="lead text-center">Please enter your shop's API credentials:</p>

    <form>
      <div class="form-group">
        <label for="client_id">Client ID:</label>
        <input id="client_id" class="form-control"
          v-model="client_id"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          placeholder="enter the client_id of your custom app"
        >
      </div>

      <div class="form-group">
        <label for="client_secret">Client Secret:</label>
        <input id="client_secret" class="form-control"
          v-model="client_secret"
          type="password"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          placeholder="enter the client_secret of your custom app"
        >
      </div>

      <div class="btn-toolbar">
        <button class="btn btn-primary" v-on:click.prevent="start">Start</button>
        &nbsp;
        <button class="btn btn-outline-danger" v-on:click.prevent="clear">Clear</button>
      </div>
    </form>

  </div>
</template>

<script>
/* eslint-disable */
import Alerts from "@/components/Alerts";

export default {
  name: 'Install',

  components: {
    Alerts
  },

  data: function() {
    return {
      alerts: [],
      client_id: null,
      client_secret: null,
      access_token: null,
    };
  },

  created: function() {
    console.info(`==== created Install @ ${this.$options.name}`);
    this.client_id = this.$storage.get("client_id", null);
    this.client_secret = this.$storage.get("client_secret", null);
  },

  methods: {
    clear: function() {
      console.log("Clearing credentials from LocalStorage");
      this.client_id = null;
      this.client_secret = null;
      this.$storage.remove("client_id");
      this.$storage.remove("client_secret");

      console.log("Clearing access token from LocalStorage");
      this.access_token = null;
      this.$storage.remove("access_token");
    },

    start: async function() {
      if (!this.api_url || !this.client_id || !this.client_secret) {
        this.alerts.push({ message: "Please enter your credentials" });
        return;
      }

      this.$storage.set("client_id", this.client_id);
      this.$storage.set("client_secret", this.client_secret);
      this.$storage.set("access_token", this.access_token);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
