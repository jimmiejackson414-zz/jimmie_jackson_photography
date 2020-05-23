<template>
  <v-container class="pt-5">
    <page-title
      text="{Gallery Name}"
      back />
    <v-row
      align="center"
      justify="center">
      <masonry
        :cols="{default: 3, 1000: 3, 700: 2, 400: 1}"
        :gutter="{default: '10px', 700: '10px'}"
        style="width: 100%;">
        <gallery-card
          v-for="(item, index) in 13"
          :key="index" />
      </masonry>
    </v-row>
  </v-container>
</template>

<script>
  import GalleryCard from '~/components/GalleryCard';
  import PageTitle from '~/components/PageTitle';

  export default {
    data: () => ({
      options: {
        columnWidth: 400,
      }
    }),

    computed: {
      route() {
        return this.$route;
      }
    },

    components: {
      GalleryCard,
      PageTitle,
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/css/breakpoints';

</style>