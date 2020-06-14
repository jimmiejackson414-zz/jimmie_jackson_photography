<template>
  <div>
    <v-container class="pt-5">
      <page-title
        :text="pageTitle"
        :back-slug="backSlug" />
      <v-row
        align="center"
        justify="start">
        <client-only>
          <masonry
            :cols="{default: 3, 700: 2, 400: 1}"
            :gutter="{default: '10px', 700: '10px'}"
            style="width: 100%;">
            <gallery-card
              v-for="(image, index) in gallery.images"
              :key="index"
              :image="image" />
          </masonry>
        </client-only>
      </v-row>
    </v-container>
    <v-container>
      <v-row
        align="center"
        class="prev-next-wrapper">
        <v-btn
          text
          :ripple="false"
          small
          nuxt
          :to="prevSlug"
          :disabled="!prevSlug"
          color="info">
          <icon
            :disabled="!prevSlug"
            name="angle-left"
            fill="grey"
            height="20px"
            width="20px" />
          Previous Gallery
        </v-btn>
        <v-btn
          text
          :ripple="false"
          small
          nuxt
          :to="nextSlug"
          :disabled="!nextSlug"
          color="info">
          Next Gallery
          <icon
            :disabled="!nextSlug"
            name="angle-right"
            fill="grey"
            height="20px"
            width="20px" />
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import fetchGalleries from '~/mixins/fetchGalleries';
  import GalleryCard from '~/components/GalleryCard';
  import PageTitle from '~/components/PageTitle';

  export default {
    name: 'GallerySlug',

    mixins: [fetchGalleries],

    transtiion: 'page-fade',

    data: () => ({
      options: {
        columnWidth: 400,
      }
    }),

    computed: {
      ...mapGetters('portfolio', ['fetchGallery', 'fetchGalleryNavigationSlugs']),
      backSlug() {
        return '/portfolio';
      },
      pageTitle() {
        return this.gallery.name;
      },
      gallery() {
        return this.fetchGallery(this.$route.params.slug);
      },
      nextSlug() {
        return this.fetchGalleryNavigationSlugs(this.gallery).next;
      },
      prevSlug() {
        return this.fetchGalleryNavigationSlugs(this.gallery).previous;
      }
    },

    components: {
      GalleryCard,
      PageTitle,
    },

    head() {
      return {
        title: this.pageTitle
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/css/breakpoints';

  .prev-next-wrapper {
    display: flex;
    justify-content: space-between;
  }
</style>