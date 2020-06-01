<template>
  <v-container class="pt-5">
    <page-title
      :text="pageTitle"
      back />
    <v-row
      align="center"
      justify="start">
      <client-only>
        <masonry
          :cols="{default: 2, 1000: 3, 700: 2, 400: 1}"
          :gutter="{default: '10px', 700: '10px'}"
          style="width: 100%;">
          <gallery-card
            v-for="(image, index) in images"
            :key="index"
            :image="image" />
        </masonry>
      </client-only>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import fetchGalleries from '~/mixins/fetchGalleries';
  import { formatSlug } from '~/helpers';
  import GalleryCard from '~/components/GalleryCard';
  import PageTitle from '~/components/PageTitle';

  export default {
    mixins: [fetchGalleries],

    data: () => ({
      options: {
        columnWidth: 400,
      }
    }),

    computed: {
      ...mapGetters('portfolio', ['fetchGallery']),
      pageTitle() {
        return formatSlug(this.$route.params.slug);
      },
      images() {
        return this.fetchGallery(this.$route.params.slug);
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