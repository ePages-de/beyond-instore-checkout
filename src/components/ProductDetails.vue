<template>
  <div class="card text-center">
    <a :href="qrCodeLink">
    <div class="card-body">
      <h5 class="card-title">
        {{ product.name }}
      </h5>
      <div class="card-text">
        <img class="card-img-top img-thumbnail p-0 m-0" :src="imageLink" :alt="product.name"/>
      </div>
    </div>
    </a>
  </div>    
</template>

<script>
/* eslint-disable */
import uriTemplates from "uri-templates";
import _ from "lodash";

export default {
  name: "ProductDetails",

  props: ["product", "alerts"],

  computed: {
    imageLink: function() {
      var link = _.get(this.product, "_links[default-image-data]", null);
      return link
        ? uriTemplates(link.href).fill({ width: 400, height: 200 })
        : "https://dummyimage.com/400x200/ffffff/0011ff.png&text=no+image";
    },

    qrCodeLink: function() {
      var addToCartTemplate = "https://beyond-instore-checkout.herokuapp.com/{shop}/cart/{productId}";
      var addToCartLink = uriTemplates(addToCartTemplate).fill({ shop: this.$route.params.shop, productId: this.product._id});
      var qrCodeTemplate = "https://api.qrserver.com/v1/create-qr-code/?{&size,format,data}";
      return uriTemplates(qrCodeTemplate).fill({
        size: "400x400",
        format: "png",
        data:  encodeURI(addToCartLink),
      });
    },
  },
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 23vw;
  height: 30vw;
  box-shadow: 2px 0px 10px #aaa;
  cursor: pointer;
}

.card-img-top {
  height: 80%;
}
</style>
