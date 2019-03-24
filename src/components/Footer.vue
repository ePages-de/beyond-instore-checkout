<template>
  <div>
    <div class="row text-center">
      <div class="col" v-if="privacyPolicy">
        <span v-b-popover.hover.html.topright="privacyPolicy" title="Privacy Policy">Privacy Policy</span>
      </div>
      <div class="col" v-if="termsAndConditions">
        <span v-b-popover.hover.html.top="termsAndConditions" title="Terms and Conditions">Terms and Conditions</span>
      </div>
      <div class="col" v-if="rightOfWithdrawal">
        <span v-b-popover.hover.html.topleft="rightOfWithdrawal" title="Right of Withdrawal">Right of Withdrawal</span>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Footer",

  props: ["privacyPolicy", "termsAndConditions", "rightOfWithdrawal"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
