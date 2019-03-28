<template>
  <footer>
    <div class="wrapper">
      <div class="footer">
        <p>Before you complete the purchase, we ask you to carefully read our <a v-b-popover.hover.html.top="privacyPolicy" title="Privacy Policy">Privacy Policy</a>, <a v-b-popover.hover.html.top="termsAndConditions" title="Terms and Conditions">Terms and Conditions</a> and <a v-b-popover.hover.html.top="rightOfWithdrawal" title="Right of Withdrawal">Right of Withdrawal</a></p>
      </div>
    </div>
  </footer>
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
