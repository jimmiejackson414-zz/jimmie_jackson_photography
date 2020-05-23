<template>
  <v-container class="pt-5">
    <page-title text="Portfolio" />
    <v-row
      align="center"
      justify="center">
      <portfolio-card
        v-for="(item, index) in 12"
        :key="index" />
    </v-row>
  </v-container>
</template>

<script>
  import PageTitle from '~/components/PageTitle';
  import PortfolioCard from '~/components/PortfolioCard';

  export default {
    components: {
      PageTitle,
      PortfolioCard,
    }
  }
</script>

<style lang="scss" scoped>

</style>