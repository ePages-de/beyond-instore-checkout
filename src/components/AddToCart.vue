<template>
  <div/>
</template>

<script>
/* eslint-disable */
export default {
  name: "AddToCart",

  data: function() {
    return {
      cart: null,
    };
  },

  props: ["productId"],

  mounted: function() {
    console.info(`==== mounted AddToCart @ ${this.$options.name}`);
    console.info(`Adding product with id '${this.productId}' to cart`);
    this.$router.push({ name: "Cart" });
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

