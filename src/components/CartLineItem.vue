<template>
  <tr>
    <td class="cart-table-item-product">
      <a href="#">
        <img
          class="cart-table-item-product-image lazyautosizes lazyloaded"
          data-sizes="auto"
          alt
          :srcset="imageSrcSet"
          sizes="130px"
        >
      </a>
      <div class="cart-table-item-product-description">
        <a href="#">
          <h2 class="headline">{{ lineItem.name }}</h2>
        </a>
        <p class="essential-features"></p>
        <button class="remove-link" title="Remove product" type="button">
          <span class="remove-text" v-on:click="$emit('deleteItem', lineItem._id)">Remove product</span>
        </button>
      </div>
    </td>
    <td class="cart-table-item-price">
      <span class="show-subhead">Price</span>
      <span class="price-value">{{ lineItem.singleItemPrice | formatPrice(shop) }}</span>
    </td>
    <td class="cart-table-item-quantity">
      <span class="show-subhead">Quantity</span>
      <div class="quantity-field">
        <button v-on:click="$emit('decreaseQuantity', lineItem._embedded.product._id)"><fa icon="minus-circle" size="2x" /></button>
        {{ lineItem.quantity }}
        <button
          v-on:click="$emit('increaseQuantity', lineItem._embedded.product._id)"
        ><fa icon="plus-circle" size="2x" /></button>
      </div>
    </td>
    <td class="cart-table-item-total">
      <span class="show-subhead">Total price</span>
      <span class="price-value">{{ lineItem.lineItemPrice | formatPrice(shop) }}</span>
    </td>
  </tr>
</template>

<script>
import uriTemplates from "uri-templates";
import _ from "lodash";

import ShopMixin from "@/mixins/ShopMixin";
import CartMixin from "@/mixins/CartMixin";

export default {
  name: "CartLineItem",
  props: ["lineItem"],
  mixins: [ShopMixin, CartMixin],
  computed: {
    imageSrcSet: function() {
      return `${this.imageLink(180)} 180w, ${this.imageLink(
        360
      )} 360w, ${this.imageLink(540)} 540w, ${this.imageLink(
        720
      )} 720w, ${this.imageLink(900)} 900w`;
    }
  },
  methods: {
    imageLink: function(width, height = 2560) {
      var link = _.get(
        this.lineItem,
        "_embedded.product._links[default-image-data]",
        null
      );
      return link
        ? uriTemplates(link.href).fill({ width, height })
        : "https://dummyimage.com/180x200/ffffff/0011ff.png&text=no+image";
    }
  }
};
</script>
