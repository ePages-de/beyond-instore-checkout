<template>
  <div id="app">
    <NavBar :shopName="shopName" :shopLogo="shopLogo"/>
    <router-view/>
    <Footer :privacyPolicy="privacyPolicy" :termsAndConditions="termsAndConditions" :rightOfWithdrawal="rightOfWithdrawal" />
  </div>
</template>

<script>
/* eslint-disable */
import ShopMixin from "@/mixins/ShopMixin";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import uriTemplates from "uri-templates";

export default {
  name: "App",

  mixins: [ShopMixin],

  components: {
    NavBar, Footer
  },

  data: function () {
    return {
      alerts: [],
    };
  },

  computed: {
    shopName: function() {
      return this.shop.name;
    },

    shopLogo: function() {
      var image = this.shopImages.find(element => element.label === 'logo');
      var href = _.get(image, "_links.data.href", "https://dummyimage.com/100x{height}/f8f9fa/222222.png&text=Logo");
      return uriTemplates(href).fill({ height: 50 });
    },
  },

  created: function() {
    console.info(`==== created App @ ${this.$options.name}`);
    this.$axios.defaults.baseURL = `https://${this.$route.params.shop}.beyondshop.cloud/api`;
  },
};
</script>

<style>
</style>
