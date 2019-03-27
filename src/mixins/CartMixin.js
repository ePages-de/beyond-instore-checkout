/* eslint-disable */
import ShopMixin from '@/mixins/ShopMixin'
import _ from "lodash";

export default {
  name: "CartMixin",

  mixins: [ShopMixin],

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
    },

    filters: {
        formatPrice: function(price, shop) {
          return new Intl.NumberFormat(shop.defaultLocale, {
            style: "currency",
            currency: price.currency
          }).format(price.amount);
        },

        formatPercentage: function(percentage, shop) {
          return new Intl.NumberFormat(shop.defaultLocale, {
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          }).format(percentage);
        }
    },

  methods: {
      getCartId: function() {
        return this.$storage.get(this.storageKey)
      },
    createCart: async function() {
        if (this.getCartId()) {
            console.info('=== Return existing cartId @ CartMixin')
            return this.getCartId()
        }
        const {data} = await this.$axios.post('/carts')
        this.cart = data
        this.$storage.set(this.storageKey, data._id);

        console.info(`=== created new cart ${data._id} @ CartMixin`)
        return data._id
    },
    putLineItem: async function(productId) {
        console.info(`=== Adding product with id '${productId}' to cart @ CartMixin`);
        const {data} = await this.$axios.post(`/carts/${this.getCartId()}/line-items`, {
            quantity: 1,
            _ref: productId,
            _type: 'PRODUCT'
        })
        this.cart = data
    },

    getCart: async function() {
        console.info('=== Getting current cart')
        if (this.getCartId()) {
            const {data} = await this.$axios.get(`/carts/${this.getCartId()}`)
            this.cart = data
        }
    },
    changeQuantity: async function(productId, quantity) {},
    deleteLineItem: async function(lineItemId) {
        const {data} = await this.$axios.delete(`/carts/${this.getCartId()}/line-items/${lineItemId}`)
        this.cart = data
    },
    setBillingAddress: async function(address) {},
    orderCart: async function() {},
  },
}
