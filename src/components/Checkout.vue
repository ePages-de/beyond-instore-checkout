<template>
    <div>
        <h3>CHECKOUT</h3>

        <router-link to="confirmation">Confirm checkout</router-link>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Checkout",

  data: function() {
    return {
      alerts: [],
      cart: null,
    };
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
