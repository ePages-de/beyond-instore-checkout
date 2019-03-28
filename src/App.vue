<template>
  <div id="app">
    <NavBar :shopName="shopName" :shopLogo="shopLogo"/>
    <router-view/>
    <Footer
      :privacyPolicy="privacyPolicy"
      :termsAndConditions="termsAndConditions"
      :rightOfWithdrawal="rightOfWithdrawal"
    />
  </div>
</template>

<script>
/* eslint-disable */
import ShopMixin from "@/mixins/ShopMixin";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default {
  name: "App",

  mixins: [ShopMixin],

  components: {
    NavBar,
    Footer
  },

  created: function() {
    console.info(`==== created App @ ${this.$options.name}`);

    // re-configure axios for BEYOND multi-tenancy
    const beyondApi = `https://${this.$route.params.shop}.beyondshop.cloud/api`;
    this.$axios.defaults.baseURL = beyondApi;
  }
};
</script>

<style>
</style>
