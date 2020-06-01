<template>
  <v-container class="pt-5">
    <page-title text="Portfolio" />
    <v-row
      align="center"
      justify="start">
      <portfolio-card
        v-for="(gallery, index) in galleries"
        :key="index"
        :gallery="gallery" />
    </v-row>
  </v-container>
</template>

<script>
  import fetchGalleries from '~/mixins/fetchGalleries';
  import PageTitle from '~/components/PageTitle';
  import PortfolioCard from '~/components/PortfolioCard';

  export default {
    name: 'Portfolio',

    mixins: [fetchGalleries],

    components: {
      PageTitle,
      PortfolioCard,
    },
  }
</script>

<style lang="scss" scoped>

</style>