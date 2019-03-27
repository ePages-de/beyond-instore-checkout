<template>
    <div class="products">
      <ul class="list-inline text-center">
        <li class="p-0 m-1 list-inline-item" v-for="product in products" :key="product._id">
          <ProductDetails :product="product" :alerts="alerts" />
        </li>
      </ul>
    </div>
</template>

<script>
/* eslint-disable */
import Alerts from "@/components/Alerts";
import ProductDetails from "@/components/ProductDetails";
import _ from "lodash";

export default {
  name: "ProductList",

  components: {
    Alerts,
    ProductDetails,
  },

  data: function() {
    return {
      alerts: [],
      products: [],
    };
  },

  mounted: function() {
    console.info(`==== mounted ProductList @ ${this.$options.name}`);
    this.getProducts();
  },
    
  methods: {
    getProducts: async function() {
      this.$axios
        .request({ url: "/product-view/products" })
        .then(response => {
          this.products = _.get(response, "data._embedded.products", []);
        })
        .catch(e => {
          console.error(e);
          this.alerts.push({ message: "error fetching products" });
        });
    }
  },
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
