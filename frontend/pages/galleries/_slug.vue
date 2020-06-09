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
  import GalleryCard from '~/components/GalleryCard';
  import PageTitle from '~/components/PageTitle';
  import galleriesQuery from '~/apollo/queries/gallery/galleries';
  // import galleryQuery from '~/apollo/queries/gallery/gallery';
  import galleriesNextPaginationQuery from '~/apollo/queries/gallery/galleryPagination';
  import galleriesPrevPaginationQuery from '~/apollo/queries/gallery/galleryPagination';

  export default {
    name: 'GallerySlug',

    apollo: {
      galleries: {
        query: galleriesQuery,
      },
      // gallery: {
      //   query: galleryQuery,
      //   variables: {
      //     slug: 'arizona',
      //   },
      // },
      galleriesNextPagination: {
        query: galleriesNextPaginationQuery,
        variables: {
          start: 1,
          limit: 1,
        }
      },
      galleriesPrevPagination: {
        query: galleriesPrevPaginationQuery,
        variables: {
          start: 2,
          limit: 1,
        },
      },
    },

    transition: 'page-fade',

    data: () => ({
      options: {
        columnWidth: 400,
      }
    }),

    computed: {
      backSlug() {
        return '/portfolio';
      },
      gallery() {
        return this.galleries.find(gallery => gallery.slug === this.$route.params.slug);
      },
      pageTitle() {
        return this.gallery.name;
      },
      nextSlug() {
        // return this.galleriesNextPagination.values[0].slug;
        return '/';
      },
      prevSlug() {
        // return this.galleriesPrevPagination.values[0].slug;
        return '/';
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