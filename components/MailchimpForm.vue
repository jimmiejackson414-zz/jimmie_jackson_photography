<template>
  <div class="wrapper">
    <client-only>
      <mailchimp-form
        element-id="mc-embedded-subscribe-form"
        url="https://jimmiejacksonphotography.us17.list-manage.com/subscribe/post?u=5ae4837c0ef0887db01bf225d&id=351c4eb7e9"
        title="Subscribe"
        subtitle="Receive the latest posts straight to your inbox!" />
    </client-only>
  </div>
</template>

<script>
  import { VueMailchimpEmailSignupForm } from 'vue-mailchimp-email-signup-form';
  import 'vue-mailchimp-email-signup-form/dist/vue-mailchimp-email-signup-form.css';

  export default {
    components: {
      MailchimpForm: VueMailchimpEmailSignupForm,
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/css/global';

  .wrapper {
    margin-top: 4rem;
  }
</style>

<style lang="scss">
  @import '~/css/global';

  .subscribe-container {
    background: #fff;
    border    : none;
    box-shadow: none;
    margin    : 2rem auto;
    text-align: center;

    &__title {
      font-family: 'Avenir Next', serif !important;
    }

    &__subtitle {
      font-size: 1.2rem;
      font-family: 'Avenir Next', serif !important;
    }

    &__submit {
      background-color: $primary;
      border-radius: 4px;
      letter-spacing: 1px;
      font-family: 'Avenir Next', serif !important;
      font-size: 1.4rem;
      font-weight: 500;
      height: 36px;
      padding: 0 36px;

      &:hover {
        background-color: darken($primary, 10%);
      }
    }
  }
</style>