<template>
  <v-container class="pt-5">
    <page-title text="Portfolio" />
    <v-row
      align="center"
      justify="center">
      <portfolio-card
        v-for="(gallery, index) in galleries"
        :key="index"
        :gallery="gallery" />
    </v-row>
  </v-container>
</template>

<script>
  import PageTitle from '~/components/PageTitle';
  import PortfolioCard from '~/components/PortfolioCard';

  export default {
    async asyncData({ $axios, env }) {
      let res = await $axios.$get(`${env.WP_API_URL}/realmedialibrary/v1/tree`);
      return { galleries: res.tree };
    },
    components: {
      PageTitle,
      PortfolioCard,
    }
  }
</script>

<style lang="scss" scoped>

</style>