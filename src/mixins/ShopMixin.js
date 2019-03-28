/* eslint-disable */
import gql from "graphql-tag";
import uriTemplates from "uri-templates";
import _ from "lodash";

const graphqlQuery = gql`
  query GetShopAndLegalContent($legalContent: [String!]) {
    shop: shop {
      name
      defaultLocale
      attributes {
        name
        value
      }
      images {
        label
        data {
          href
        }
      }
    }

    legalContent: allLegalContent(types: $legalContent) {
      type
      content
    }
  }
`;

export default {
  name: "ShopMixin",

  data: function() {
    return {
      shop: {
        // default values for computed functions
        attributes: [],
        images: []
      },
      legalContent: [],
      skipQuery: false,
      shopAttributes: []
    };
  },

  mounted: async function() {
    console.info(`==== mounted ShopMixin @ ${this.$options.name}`);
    //await this.fetchShopAndLegelContent();
  },

  methods: {
    fetchShopAndLegelContent: async function() {
      this.$apollo.queries.shopAndLegalContent.skip = false;
      await this.$apollo.queries.shopAndLegalContent.refetch();
    },

    getShopAttributes: async function() {
      return this.$axios
        .request({ url: "/shop/attributes", params: { size: 100 } })
        .then(response => {
          this.shopAttributes = _.get(
            response,
            "data._embedded.attributes",
            []
          );
        })
        .catch(e => {
          console.error(e);
          this.alerts.push({ message: "error fetching shop attributes" });
        });
    }
  },

  apollo: {
    shopAndLegalContent: {
      query() {
        return graphqlQuery;
      },
      variables() {
        return {
          legalContent: [
            "privacy-policy",
            "terms-and-conditions",
            "right-of-withdrawal"
          ]
        };
      },
      skip() {
        return this.skipQuery;
      },
      update(data) {
        console.info(
          `Skip GraphQL query? @ ${this.$options.name}`,
          this.skipQuery
        );
        if (this.skipQuery) {
          return;
        }
        this.shop = data.shop;
        this.legalContent = data.legalContent;
        this.skipQuery = true;
      }
    }
  },

  computed: {
    instoreAddress: function() {
      //var address = this.shop.attributes.find(
      var address = this.shopAttributes.find(
        element => element.name === "instore-checkout:address"
      );
      address = address ? JSON.parse(address.value) : {};
      Object.keys(address).forEach(
        key => address[key] === null && delete address[key]
      );
      return address;
    },

    instorePaymentMethod: function() {
      //var paymentMethod = this.shop.attributes.find(
      var paymentMethod = this.shopAttributes.find(
        element => element.name === "instore-checkout:payment-method"
      );
      return paymentMethod ? paymentMethod.value : null;
    },

    instoreShippingMethod: function() {
      //var shippingMethod = this.shop.attributes.find(
      var shippingMethod = this.shopAttributes.find(
        element => element.name === "instore-checkout:shipping-method"
      );
      return shippingMethod ? shippingMethod.value : null;
    },

    shopName: function() {
      return this.shop.name;
    },

    shopLogo: function() {
      var image = this.shop.images.find(element => element.label === "logo");
      var href = _.get(
        image,
        "data.href",
        "https://dummyimage.com/100x{height}/f8f9fa/222222.png&text=Logo"
      );
      return uriTemplates(href).fill({ height: 50 });
    },

    privacyPolicy: function() {
      var lc = this.legalContent.find(
        element => element.type === "privacy-policy"
      );
      return lc ? lc.content : "";
    },

    termsAndConditions: function() {
      var lc = this.legalContent.find(
        element => element.type === "terms-and-conditions"
      );
      return lc ? lc.content : "";
    },

    rightOfWithdrawal: function() {
      var lc = this.legalContent.find(
        element => element.type === "right-of-withdrawal"
      );
      return lc ? lc.content : "";
    }
  }
};
