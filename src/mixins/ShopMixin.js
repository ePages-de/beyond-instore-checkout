/* eslint-disable */
import _ from "lodash";

export default {
  name: "ShopMixin",

  data: function () {
    return {
      shop: {},
      shopAttributes: [],
      shopImages: [],
      privacyPolicy: null,
      termsAndConditions: null,
      rightOfWithdrawal: null,
    };
  },

  computed: {
    shopSettings: function() {
      var address = this.shopAttributes.find(element => element.name === 'instore-checkout:address');
      address = (address ? JSON.parse(address.value) : null);
      Object.keys(address).forEach((key) => (address[key] == null) && delete address[key]);

      var paymentMethod = this.shopAttributes.find(element => element.name === 'instore-checkout:payment-method');
      paymentMethod = (paymentMethod ? paymentMethod.value : null);

      var shippingMethod = this.shopAttributes.find(element => element.name === 'instore-checkout:shipping-method');
      shippingMethod = (shippingMethod ? shippingMethod.value : null);

      return {
        address: address,
        paymentMethod: paymentMethod,
        shippingMethod: shippingMethod,
      };
    }
  },

  mounted: function() {
    console.info(`==== mounted ShopMixin @ ${this.$options.name}`);
    this.getShop();
    this.getShopAttributes();
    this.getShopImages();
    this.getPrivacyPolicy();
    this.getTermsAndConditions();
    this.getRightOfWithdrawal();
  },

  methods: {
    getShop: async function() {
      return this.$axios
        .request({ url: "/shop" })
        .then(response => {
          this.shop = _.get(response, "data", {});
        })
        .catch(e => {
          console.error(e);
          this.alerts.push({ message: "error fetching shop" });
        });
    },

    getShopAttributes: async function() {
      this.$axios
        .request({url: "/shop/attributes", params: {size: 100 } })
        .then(response => {
          this.shopAttributes = _.get(response, "data._embedded.attributes", []);
        })
        .catch(e => {
          console.error(e);
          this.alerts.push({ message: "error fetching shop attributes" });
        });
    },

    getShopImages: async function() {
      this.$axios
        .request({ url: "/shop/images" })
        .then(response => {
          this.shopImages = _.get(response, "data._embedded.images", []);
        })
        .catch(e => {
          console.error(e);
          this.alerts.push({ message: "error fetching shop images" });
        });
    },

    getPrivacyPolicy: async function() {
      this.$axios
        .request({ url: "/legal-content/privacy-policy" })
        .then(response => {
          this.privacyPolicy = _.get(response, "data.content", "");
        })
        .catch(e => {
          console.error(e);
          this.alerts.push({ message: "error fetching privacy policy" });
        });
    },

    getTermsAndConditions: async function() {
      this.$axios
        .request({ url: "/legal-content/terms-and-conditions" })
        .then(response => {
          this.termsAndConditions = _.get(response, "data.content", "");
        })
        .catch(e => {
          console.error(e);
          this.alerts.push({ message: "error fetching terms and conditions" });
        });
    },

    getRightOfWithdrawal: async function() {
      this.$axios
        .request({ url: "/legal-content/right-of-withdrawal" })
        .then(response => {
          this.rightOfWithdrawal = _.get(response, "data.content", "");
        })
        .catch(e => {
          console.error(e);
          this.alerts.push({ message: "error fetching right of withdrawal" });
        });
    },
  }
}
