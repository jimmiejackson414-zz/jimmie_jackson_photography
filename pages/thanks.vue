<template>
  <v-container class="pt-5">
    <page-title text="Thanks!" />
    <v-row justify="center">
      <v-col
        cols="8">
        <p class="body-1 text-center">
          I hope you enjoy these photos as much as I enjoyed taking them.
        </p>
        <p class="body-1 text-center">
          Please be on the look out for an email that contains the download link for the image(s) you've just purchased, as well as an invoice of your payment.
        </p>
        <p class="body-1 text-center">
          If your emails don't arrive within 24 hours, make sure to check your Spam folder. If you have any issues or questions whatsoever, please don't hesitate to <nuxt-link to="/contact">
            contact me!
          </nuxt-link>
        </p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <div class="logo-container">
          <v-img
            :src="require('~/static/android-chrome-512x512.png')"
            width="100"
            height="100"
            class="mx-auto" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import PageTitle from '~/components/PageTitle';


  export default {
    name: 'Thanks',

    transition: 'page-fade',

    components: {
      PageTitle,
    },

    head() {
      return {
        title: 'Thanks'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/css/global';

  .logo-container {
    display: block;
    overflow: hidden;
    text-align: center;
    position: relative;

   &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 25%;
      border-top: 1px solid $light-grey;
      width: 50%;
    }

    .v-image {
      border: 1rem solid white;
    }
  }
</style>