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
  import PageTitle from '~/components/PageTitle'
  import PortfolioCard from '~/components/PortfolioCard'
  import galleriesQuery from '~/apollo/queries/gallery/galleries';

  export default {
    name: 'Portfolio',

    apollo: {
      galleries: {
        prefetch: true,
        query: galleriesQuery,
      }
    },

    transition: 'page-fade',

    components: {
      PageTitle,
      PortfolioCard
    },

    head() {
      return {
        title: 'Portfolio'
      }
    }
  }
</script>

<style lang="scss" scoped></style>
