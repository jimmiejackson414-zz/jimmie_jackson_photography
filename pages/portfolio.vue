<template>
  <div>
    <client-only>
      <page-title text="Portfolio" />
      <v-container>
        <v-row>
          <image-card
            v-for="(gallery, index) in galleries"
            :key="index"
            btn-text="Visit Gallery"
            :item="gallery"
            item-type="galleries" />
        </v-row>
      </v-container>
    </client-only>
  </div>
</template>

<script>
  import ImageCard from '~/components/ImageCard';
  import PageTitle from '~/components/PageTitle';
  import fetchGalleries from '~/mixins/fetchGalleries';

  export default {
    name: 'Portfolio',

    mixins: [fetchGalleries],

    transition: 'page-fade',

    components: {
      ImageCard,
      PageTitle,
    },

    head() {
      return {
        title: 'Portfolio'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .portfolio-container {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
</style>
