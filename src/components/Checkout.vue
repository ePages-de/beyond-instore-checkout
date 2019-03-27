<template>
  <div class="checkout">
    <div class="section">
      <div class="wrapper">
        <div class="content">
          <div class="checkout-step">

            <div class="checkout-step-content">
              <form autocomplete="on" name="personalData">
                <div>
                  <h1 class="checkout-step-content-headline">Personal details</h1>
                  <div class="ep-form-row checkout-form-group">
                    <div class="ep-form-row-label"><span class="ep-form-row-label-text">Email address*</span><input autocomplete="email" autocorrect="off" autocapitalize="off" spellcheck="false" required="" class="ep-form-text-field checkout-Input-field" name="personalData.billingAddress.email" type="email" data-com.agilebits.onepassword.user-edited="yes"></div>
                  </div>
                </div>
                <div class="checkout-button-row">
                  <router-link to="cart" class="back-link">
                    Back to Basket
                  </router-link>
                  <router-link to="confirmation">
                    <button type="button" class="button button-primary">Buy now</button>
                  </router-link>
                </div>
              </form>
            </div>

            <div class="checkout-step-cart" v-if="cart">
              <div class="checkout-step-cart-title-container">
                <h2 class="checkout-step-cart-headline">Order overview</h2><a class="checkout-step-cart-edit" href="1004-cart.html"></a>
              </div>
              <ul class="checkout-step-cart-list">
                <li class="checkout-step-cart-list-item">
                  <a><img src="Dateien/image-1.jpg" alt="Secrid Slimwallet Vintage" width="70px"></a>
                  <div class="checkout-product-description">
                    <a><h2 class="checkout-product-description-headline">Secrid Slimwallet Vintage</h2></a>
                    <div class="checkout-product-description-info"><p>Quantity: 1</p></div>
                  </div>
                  <span class="checkout-cart-item-price">49,95&nbsp;&pound;</span>
                </li>
              </ul>
              <table class="checkout-cart-totals-table">
                <tbody>
                  <tr>
                    <td class="line-item-title">Subtotal</td>
                    <td class="line-item-price">{{ cart.subtotal | formatPrice(shop) }}</td>
                  </tr>
                  <tr class="separator">
                    <td class="line-item-title">Total amount (net)</td>
                    <td class="line-item-price">{{ cart.netTotal | formatPrice(shop) }}</td>
                  </tr>
                  <tr v-for="tax in cart.taxes" :key="tax.taxClass">
                    <td class="line-item-title">VAT ({{ tax.taxRate | formatPercentage(shop) }})</td>
                    <td class="line-item-price">{{ tax | formatPrice(shop) }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td class="grand-amount-title">Total amount</td>
                    <td class="grand-amount">{{ cart.grandTotal | formatPrice(shop) }} <span class="grand-amount-note">incl. VAT</span></td>
                  </tr>
                </tfoot>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import CartMixin from "@/mixins/CartMixin";

export default {
  name: "Checkout",

  mixins: [CartMixin],

  created: function() {
    this.getCart();
  },

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

