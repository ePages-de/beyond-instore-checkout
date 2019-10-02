<template>
  <div class="checkout">
    <div class="section">
      <div class="wrapper">
        <div class="content">
          <div class="checkout-step">
            <div class="checkout-step-content">
              <form autocomplete="on" name="personalData" v-on:submit.prevent="submitForm">
                <div>
                  <h1 class="checkout-step-content-headline">Personal details</h1>
                  <div class="ep-form-row checkout-form-group">
                    <div class="ep-form-row-label">
                      <span class="ep-form-row-label-text">Email address*</span>
                      <input
                        v-model="email"
                        autocomplete="email"
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        required
                        class="ep-form-text-field checkout-Input-field"
                        name="personalData.billingAddress.email"
                        type="email"
                      />
                    </div>
                  </div>
                </div>
                <div class="checkout-button-row">
                  <router-link to="cart" class="back-link">
                    <fa icon="caret-left" />Back to Basket
                  </router-link>
                  <button type="submit" class="button button-primary">Buy now</button>
                </div>
              </form>
            </div>

            <div class="checkout-step-cart" v-if="cart">
              <div class="checkout-step-cart-title-container">
                <h2 class="checkout-step-cart-headline">Order overview</h2>
              </div>
              <ul
                class="checkout-step-cart-list"
                v-for="lineItem in cart.lineItems"
                :key="lineItem._id"
              >
                <li class="checkout-step-cart-list-item">
                  <img
                    :src="lineItem._embedded.product | imageLink"
                    :alt="lineItem.name"
                    width="70px"
                  />
                  <div class="checkout-product-description">
                    <a>
                      <h2 class="checkout-product-description-headline">{{ lineItem.name }}</h2>
                    </a>
                    <div class="checkout-product-description-info">
                      <p>Quantity: {{ lineItem.quantity }}</p>
                    </div>
                  </div>
                  <span
                    class="checkout-cart-item-price"
                  >{{ lineItem.lineItemPrice | formatPrice(shop) }}</span>
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
                    <td class="grand-amount">
                      {{ cart.grandTotal | formatPrice(shop) }}
                      <span
                        class="grand-amount-note"
                      >incl. VAT</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <iframe
      src="/confirmation_page.html"
      style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; display: none;"
      v-on:load="onIframeLoaded"
    />
  </div>
</template>

<script>
/* eslint-disable */
import ShopMixin from "@/mixins/ShopMixin";
import CartMixin from "@/mixins/CartMixin";
import uriTemplates from "uri-templates";
import _ from "lodash";

export default {
  name: "Checkout",

  mixins: [CartMixin, ShopMixin],

  data: function() {
    return {
      alerts: [],
      cart: null,
      email: null
    };
  },

  filters: {
    imageLink: function(product) {
      var href = _.get(
        product,
        "_links[default-image-data].href",
        "https://dummyimage.com/{width}x{height}/ffffff/0011ff.png&text=no+image"
      );
      return uriTemplates(href).fill({ width: 400, height: 200 });
    }
  },

  created: function() {
    console.info(`==== created Checkout @ ${this.$options.name}`);
    window.addEventListener("message", this.messageHandler);
    this.getCart();
  },
  beforeDestroy: function() {
    window.removeEventListener("message", this.messageHandler);
  },

  methods: {
    onIframeLoaded: function() {
      document.querySelector("iframe").contentWindow.postMessage(
        {
          action: "price",
          price: this.cart.grandTotal.amount.toFixed(2)
        },
        "*"
      );
    },
    messageHandler: function(message) {
      if (message && message.data) {
        if (message.data.action === "hide") {
          document.querySelector("iframe").style.display = "none";
          document.querySelector(".navbar").style.display = "block";
        }
        if (message.data.action === "submit") {
          this.submitOrder();
        }
      }
    },
    submitForm: function() {
      document.querySelector("iframe").style.display = "block";
      document.querySelector(".navbar").style.display = "none";
    },
    submitOrder: async function() {
      console.info(`=== submitForm @ Checkout`);

      await this.getShopAttributes();
      var billingAddress = Object.assign({}, this.instoreAddress, {
        email: this.email
      });
      console.info(billingAddress);

      var shippingAddress = Object.assign({}, this.instoreAddress, {
        email: this.email
      });
      console.info(shippingAddress);

      await this.setBillingAddress(billingAddress);
      await this.setShippingAddress(shippingAddress);
      await this.orderCart();
      this.email = null;
      this.cart = null;
      document.querySelector("iframe").style.display = "none";
      document.querySelector(".navbar").style.display = "block";
      this.$router.push({ name: "Confirmation" });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
