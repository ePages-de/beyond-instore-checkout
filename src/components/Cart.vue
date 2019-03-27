<template>
  <div class="cart">
    <section class="section">
      <div class="wrapper">
        <div class="content">
          <h1>Your basket</h1>
          <table class="cart-table">
            <thead class="cart-table-head">
              <tr>
                <th class="cart-table-head-product">
                  <span>Product</span>
                </th>
                <th class="cart-table-head-price">
                  <span>Price</span>
                </th>
                <th class="cart-table-head-quantity">
                  <span>Quantity</span>
                </th>
                <th class="cart-table-head-total">
                  <span>Total price</span>
                </th>
              </tr>
            </thead>
            <tbody v-if="cart">
              <CartLineItem
                v-for="lineItem in cart.lineItems"
                :key="lineItem._id"
                :lineItem="lineItem"
              />
            </tbody>
          </table>
          <div class="cart-totals">
            <dl class="cart-totals-table">
              <dt class="grand-amount-title">Total amount</dt>
              <dd class="grand-amount">
                49,95&nbsp;&pound;
                <span class="grand-amount-note">incl. VAT</span>
              </dd>
            </dl>
            <div>
              <router-link to="checkout">
                <button class="cart-totals-button-checkout" type="button">
                  Checkout
                  <span class="checkout-button-icon"></span>
                </button>
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
import CartLineItem from "@/components/CartLineItem";

export default {
  name: "Cart",

  mixins: [CartMixin],
  components: { CartLineItem },

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
