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

  computed: {
      storageKey: function() {
          return `instore-cartId:${this.$route.params.shop}`;
      },
      cartId: function() {
        return this.$storage.get(this.storageKey)
      }
  },

  methods: {
    createCart: async function() {
        if (this.cartId) {
            console.info('=== Return existing cartId @ CartMixin')
            return this.cartId
        }
        const {data} = await this.$axios.post('/carts')
        this.cart = data
        this.$storage.set(this.storageKey, data._id);

        console.info(`=== created new cart ${data._id} @ CartMixin`)
        return data._id
    },
    putLineItem: async function(productId) {
        console.info(`=== Adding product with id '${productId}' to cart @ CartMixin`);
        const {data} = await this.$axios.post(`/carts/${this.cartId}/line-items`, {
            quantity: 1,
            _ref: productId,
            _type: 'PRODUCT'
        })
        this.cart = data
    },

    getCart: async function() {
        console.info('=== Getting current cart')
        if (this.cartId) {
            const {data} = await this.$axios.get(`/carts/${this.cartId}`)
            this.cart = data
        }
    },
    changeQuantity: async function(productId, quantity) {},
    setBillingAddress: async function(address) {},
    orderCart: async function() {},
  },
}
