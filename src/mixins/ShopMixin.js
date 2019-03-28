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
      skip: false
    };
  },

  apollo: {
    shopAndLegalContent: {
      query: graphqlQuery,
      variables: {
        legalContent: [
          "privacy-policy",
          "terms-and-conditions",
          "right-of-withdrawal"
        ]
      },
      skip() {
        return this.skip;
      },
      update(data) {
        console.info(`Skip GraphQL @ ${this.$options.name}`, this.skip);
        if (this.skip) {
          return;
        }
        this.shop = data.shop;
        this.legalContent = data.legalContent;
        this.skip = true;
      }
    }
  },

  computed: {
    shopSettings: function() {
      var address = this.shop.attributes.find(
        element => element.name === "instore-checkout:address"
      );
      address = address ? JSON.parse(address.value) : null;
      Object.keys(address).forEach(
        key => address[key] === null && delete address[key]
      );

      var paymentMethod = this.shop.attributes.find(
        element => element.name === "instore-checkout:payment-method"
      );
      paymentMethod = paymentMethod ? paymentMethod.value : null;

      var shippingMethod = this.shop.attributes.find(
        element => element.name === "instore-checkout:shipping-method"
      );
      shippingMethod = shippingMethod ? shippingMethod.value : null;

      return {
        address: address,
        paymentMethod: paymentMethod,
        shippingMethod: shippingMethod
      };
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
