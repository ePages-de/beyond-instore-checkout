<template>
  <div class="cart">
    <section class="section">
      <div class="wrapper">
        <div class="content">
          <h1>Your basket</h1>
          <table class="cart-table">
            <thead class="cart-table-head">
              <tr>
                <th class="cart-table-head-product"><span>Product</span></th>
                <th class="cart-table-head-price"><span>Price</span></th>
                <th class="cart-table-head-quantity"><span>Quantity</span></th>
                <th class="cart-table-head-total"><span>Total price</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="cart-table-item-product">
                  <a href="#">
                    <img class="cart-table-item-product-image lazyautosizes lazyloaded" data-sizes="auto" alt="" data-srcset="https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=180&amp;height=2560 180w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=360&amp;height=2560 360w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=540&amp;height=2560 540w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=720&amp;height=2560 720w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=900&amp;height=2560 900w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=1080&amp;height=2560 1080w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=1296&amp;height=2560 1296w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=1512&amp;height=2560 1512w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=1728&amp;height=2560 1728w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=1944&amp;height=2560 1944w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=2160&amp;height=2560 2160w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=2376&amp;height=2560 2376w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=2560&amp;height=2560 2560w" sizes="130px" srcset="https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=180&amp;height=2560 180w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=360&amp;height=2560 360w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=540&amp;height=2560 540w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=720&amp;height=2560 720w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=900&amp;height=2560 900w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=1080&amp;height=2560 1080w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=1296&amp;height=2560 1296w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=1512&amp;height=2560 1512w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=1728&amp;height=2560 1728w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=1944&amp;height=2560 1944w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=2160&amp;height=2560 2160w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=2376&amp;height=2560 2376w, https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=2560&amp;height=2560 2560w">
                    <noscript><img class="cart-table-item-product-image" src="https://mochilas13.beyondshop.cloud/api/core-storage/images/image-1.jpg?hash=efb48df1203fdedc1ead6bf380b3889a716a6f96&amp;width=600"/></noscript>
                  </a>
                  <div class="cart-table-item-product-description">
                    <a href="#"><h2 class="headline">Secrid Slimwallet Vintage</h2></a>
                    <p class="essential-features"></p>
                    <button class="remove-link" title="Remove product" type="button"><span class="remove-text">Remove product</span></button>
                  </div>
                </td>
                <td class="cart-table-item-price"><span class="show-subhead">Price</span><span class="price-value">49,95&nbsp;&pound;</span></td>
                <td class="cart-table-item-quantity"><span class="show-subhead">Quantity</span><div class="quantity-field"><button></button>1<button></button></div></td>
                <td class="cart-table-item-total"><span class="show-subhead">Total price</span><span class="price-value ">49,95&nbsp;&pound;</span></td>
              </tr>
            </tbody>
          </table>
          <div class="cart-totals">
            <dl class="cart-totals-table">
              <dt class="grand-amount-title">Total amount</dt>
              <dd class="grand-amount">49,95&nbsp;&pound;<span class="grand-amount-note">incl. VAT</span></dd>
            </dl>
            <div>
              <router-link to="checkout">
                <button class="cart-totals-button-checkout" type="button">Checkout<span class="checkout-button-icon"></span></button>
              </router-link>
            </div>
            <div class="checkout-buttons row"></div>
          </div>
        </div>
      </div>
    </section>
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
