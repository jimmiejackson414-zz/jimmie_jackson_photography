<template>
  <div>
    <client-only>
      <page-title text="Portfolio" />
      <v-container>
        <v-row
          v-masonry
          class="mx-auto"
          fit-width="true"
          gutter="10"
          transition-duration="0.2s"
          item-selector=".child">
          <div
            v-for="(gallery, index) in galleries"
            :key="index"
            v-masonry-tile
            class="child">
            <image-card
              btn-text="Visit Gallery"
              :item="gallery"
              item-type="galleries" />
          </div>
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
        script: [
          {
            async: true,
            defer: true,
            src: 'https://cdnjs.cloudflare.com/ajax/libs/masonry/4.0.0/masonry.pkgd.min.js',
          }
        ],
        title: 'Portfolio',
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
