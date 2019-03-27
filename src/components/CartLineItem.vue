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
          <span class="remove-text">Remove product</span>
        </button>
      </div>
    </td>
    <td class="cart-table-item-price">
      <span class="show-subhead">Price</span>
      <span class="price-value">49,95&nbsp;&pound;</span>
    </td>
    <td class="cart-table-item-quantity">
      <span class="show-subhead">Quantity</span>
      <div class="quantity-field">
        <button></button>1
        <button></button>
      </div>
    </td>
    <td class="cart-table-item-total">
      <span class="show-subhead">Total price</span>
      <span class="price-value">49,95&nbsp;&pound;</span>
    </td>
  </tr>
</template>

<script>
import uriTemplates from "uri-templates";
import _ from "lodash";

export default {
  name: "CartLineItem",
  props: ["lineItem"],
  computed: {
    imgSrcSet: function() {
      return `${imageLink(180)} 180w, ${imageLink(360)} 360w, ${imageLink(
        540
      )} 540w, ${imageLink(720)} 720w, ${imageLink(900)} 900w`;
    },
    price: function() {}
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
