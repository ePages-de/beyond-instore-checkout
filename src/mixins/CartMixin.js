/* eslint-disable */
import _ from "lodash";

export default {
  name: "CartMixin",

  data: function () {
    return {
      cart: {},
    };
  },

  mounted: function() {
      this.getCart()
  },

  methods: {
    createCart: async function() {},
    putLineItem: async function(productId) {},

    getCart: async function() {
        console.log('==== getCart @ CartMixin')
    },
    changeQuantity: async function(productId, quantity) {},
    setBillingAddress: async function(address) {},
    order: async function() {},
  },
}
