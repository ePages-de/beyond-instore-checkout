<template>
  <div class="card text-center">
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <div class="card-text">
        <img class="card-img-top img-thumbnail p-0 m-0" :src="imageLink" :alt="product.name" />
        <div v-if="!product.variations || variations.length" class="qr-codes">
          QR Codes:
          <a
            v-for="qrcode in qrcodes"
            :href="qrcode.href"
            :key="qrcode.href"
          >{{qrcode.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import uriTemplates from "uri-templates";
import _ from "lodash";

export default {
  name: "ProductDetails",

  props: ["product", "alerts"],

  data: function() {
    return {
      variations: null
    };
  },

  created: function() {
    this.loadVariations();
  },

  computed: {
    qrcodes: function() {
      if (!this.product.variationAttributes) {
        return [
          {
            name: this.product.name,
            href: this.getQrCodeLink(this.product._id)
          }
        ];
      }
      if (this.variations) {
        return this.variations.map(variation => ({
          name: variation.variationAttributeValues
            .map(value => value.value)
            .join(" "),
          href: this.getQrCodeLink(variation._id)
        }));
      }
    },
    imageLink: function() {
      var link = _.get(this.product, "_links[default-image-data]", null);
      return link
        ? uriTemplates(link.href).fill({ width: 400, height: 200 })
        : "https://dummyimage.com/400x200/ffffff/0011ff.png&text=no+image";
    }
  },

  methods: {
    loadVariations: async function() {
      if (this.product.variationAttributes) {
        const { data: product } = await this.$axios.get(
          this.product._links.self.href
        );
        this.variations = product.variations;
      }
    },
    getQrCodeLink: function(productId) {
      var origin = document.location.origin;
      var addToCartTemplate = `${origin}/{shop}/cart/{productId}`;
      var addToCartLink = uriTemplates(addToCartTemplate).fill({
        shop: this.$route.params.shop,
        productId
      });
      var qrCodeTemplate =
        "https://api.qrserver.com/v1/create-qr-code/?{&size,format,data}";
      return uriTemplates(qrCodeTemplate).fill({
        size: "400x400",
        format: "png",
        data: encodeURI(addToCartLink)
      });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 23vw;
  min-height: 30vw;
  box-shadow: 2px 0px 10px #aaa;
  cursor: pointer;
}

.card-img-top {
  height: 80%;
}

.qr-codes a {
  padding: 5px;
}
</style>
