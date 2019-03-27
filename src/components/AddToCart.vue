<template>
  <div/>
</template>

<script>
/* eslint-disable */
import CartMixin from "@/mixins/CartMixin";
import ShopMixin from "@/mixins/ShopMixin";

export default {
  name: "AddToCart",

  mixins: [ShopMixin, CartMixin],

  data: function() {
    return {
      cart: null
    };
  },

  props: ["productId"],

  mounted: async function() {
    console.info(`==== mounted AddToCart @ ${this.$options.name}`);
    console.info(`Adding product with id '${this.productId}' to cart`);

    await this.getShop();

    await this.createCart();

    await this.putLineItem(this.productId);

    this.$router.replace({ name: "Cart" });
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

