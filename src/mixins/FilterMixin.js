/* eslint-disable */
export default {
  name: "FilterMixin",

  filters: {
    formatPrice: function(price, shop) {
      return new Intl.NumberFormat(shop.defaultLocale, {
        style: "currency",
        currency: price.currency
      }).format(price.amount);
    },

    formatPercentage: function(percentage, shop) {
      return new Intl.NumberFormat(shop.defaultLocale, {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(percentage);
    }
  }
};
