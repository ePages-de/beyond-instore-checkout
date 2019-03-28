/* eslint-disable */
import FilterMixin from "@/mixins/FilterMixin";
import ShopMixin from "@/mixins/ShopMixin";
import _ from "lodash";

export default {
  name: "CartMixin",

  mixins: [FilterMixin, ShopMixin],

  data: function() {
    return {
      cart: {}
    };
  },

  mounted: function() {
    this.getCart();
  },

  computed: {
    storageKey: function() {
      return `instore-cartId:${this.$route.params.shop}`;
    }
  },

  methods: {
    getCartId: function() {
      return this.$storage.get(this.storageKey);
    },
    createCart: async function() {
      if (this.getCartId()) {
        console.info(
          "=== Return existing cartId @ CartMixin",
          this.getCartId()
        );
        return this.getCartId();
      }

      console.info("=== Creating new cart @ CartMixin");
      const { data } = await this.$axios.post("/carts");
      this.$storage.set(this.storageKey, data._id);
      this.cart = data;

      try {
        await this.setShippingAddress(this.shopSettings.address);
        await this.$axios.put(
          `/carts/${this.getCartId()}/payment-methods/current`,
          this.shopSettings.paymentMethod,
          { headers: { "content-type": "text/uri-list" } }
        );
        await this.$axios.put(
          `/carts/${this.getCartId()}/shipping-methods/current`,
          this.shopSettings.shippingMethod,
          { headers: { "content-type": "text/uri-list" } }
        );

        console.info(`=== created new cart ${this.getCartId()} @ CartMixin`);
        return this.getCartId();
      } catch (_error) {
        this.$storage.set(this.storageKey, null);
      }
    },
    putLineItem: async function(productId, quantity = 1) {
      console.info(
        `=== Adding product with id '${productId}' to cart @ CartMixin`
      );
      const { data } = await this.$axios.post(
        `/carts/${this.getCartId()}/line-items`,
        {
          quantity,
          _ref: productId,
          _type: "PRODUCT"
        }
      );
      this.cart = data;
    },

    getCart: async function() {
      console.info(`=== Getting current cart @ ${this.$options.name}`);
      if (this.getCartId()) {
        const { data } = await this.$axios.get(`/carts/${this.getCartId()}`);
        this.cart = data;
      }
    },
    deleteLineItem: async function(lineItemId) {
      console.info(`=== Deleting line item ${lineItemId}`);
      const { data } = await this.$axios.delete(
        `/carts/${this.getCartId()}/line-items/${lineItemId}`
      );
      this.cart = data;
    },
    setBillingAddress: async function(address) {
      console.info(
        `=== Setting billing address for '${address.email}' to cart @ CartMixin`
      );
      const { data } = await this.$axios.put(
        `/carts/${this.getCartId()}/billing-address`,
        address
      );
      this.cart = data;
    },
    setShippingAddress: async function(address) {
      console.info(`=== Setting shipping address to cart @ CartMixin`);
      await this.$axios.put(
        `/carts/${this.getCartId()}/shipping-address`,
        address
      );
    },
    orderCart: async function() {
      console.info("=== Ordering current cart");

      await this.$axios.post(`/carts/${this.getCartId()}/order`, {
        salesChannel: "instore",
        marketingChannel: "qr-code",
        testOrder: false,
        termsAndConditionsExplicitlyAccepted: false
      });
      this.$storage.remove(this.storageKey);
    }
  }
};
