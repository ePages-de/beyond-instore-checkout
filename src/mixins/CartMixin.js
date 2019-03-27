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
    createCart: async function() {
        console.log('==== createCart @ CartMixin')
    },
    putLineItem: async function(productId) {
        console.info(`=== Adding product with id '${productId}' to cart @ CartMixin`);
    },

    getCart: async function() {
        console.log('==== getCart @ CartMixin')
    },
    changeQuantity: async function(productId, quantity) {},
    setBillingAddress: async function(address) {},
    orderCart: async function() {},
  },
}
