<template>
  <v-container class="pt-5">
    <page-title
      :text="pageTitle"
      back />
    <v-row
      align="center"
      justify="center">
      <client-only>
        <masonry
          :cols="{default: 3, 1000: 3, 700: 2, 400: 1}"
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
  import GalleryCard from '~/components/GalleryCard';
  import PageTitle from '~/components/PageTitle';
  import { formatSlug, rmlFolders } from '~/helpers';

  export default {
    async asyncData ({ $axios, params }) {
      const images = await $axios.$get(`/wp/v2/media?rml_folder=${rmlFolders(params.slug)}`);
      return { images };
    },

    data: () => ({
      options: {
        columnWidth: 400,
      }
    }),

    computed: {
      pageTitle() {
        return formatSlug(this.$route.params.slug);
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