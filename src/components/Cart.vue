<template>
  <div>
    <h3>CART</h3>

    <router-link to="checkout">Proceed to checkout</router-link>
  </div>
</template>

<script>
/* eslint-disable */
import CartMixin from "@/mixins/CartMixin";
export default {
  name: "Cart",

  mixins: [CartMixin],

  created: function() {
    this.getCart();
  },

  data: function() {
    return {
      alerts: [],
      cart: null
    };
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

