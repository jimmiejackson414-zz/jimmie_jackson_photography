<template>
  <div>
    <client-only>
      <page-title :text="searchTerm" />
      <v-container>
        <v-row
          v-if="loading"
          class="ma-0 text-center"
          align="start"
          justify="center">
          <v-col cols="12">
            <div class="loading">
              <spinner />
            </div>
          </v-col>
        </v-row>
        <v-row v-else-if="results.length && !loading">
          <image-card
            v-for="(result, index) in results"
            :key="index"
            :item="result"
            btn-text="View"
            item-type="images" />
        </v-row>
        <v-row
          v-else
          justify="center"
          class="mx-0">
          <h3 class="display-1 text-center">
            {{ error }}
          </h3>
        </v-row>
      </v-container>
    </client-only>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import searchImages from '~/apollo/queries/search/searchImages';
  import searchTags from '~/apollo/queries/search/searchTags';
  import ImageCard from '~/components/ImageCard';
  import PageTitle from '~/components/PageTitle';
  import Spinner from '~/components/Spinner';

  export default {
    name: 'Search',

    transition: 'page-fade',

    data: () => ({
      error: null,
      loading: true,
      results: [],
    }),

    computed: {
      ...mapState('search', ['query']),
      searchTerm() {
        return `Search Term: ${this.query ? this.query : 'All Results'}`
      },
    },

    methods: {
      async performSearch() {

        const { data: { images: tagsData }} = await this.$apollo.query({
          query: searchTags,
          variables: {
            searchQuery: this.query,
          }
        });

        const { data: { images: imagesData }} = await this.$apollo.query({
          query: searchImages,
          variables: {
            searchQuery: this.query,
          }
        });

        if (!tagsData.length && !imagesData.length) this.error = 'No results were found. Please try again.';
        else this.results = [...tagsData, ...imagesData];
        this.loading = false;
      }
    },

    mounted() {
      this.performSearch();
    },

    watch: {
      query(value) {
        if (value) this.performSearch();
      }
    },

    components: {
      ImageCard,
      PageTitle,
      Spinner,
    }
  }
</script>

<style lang="scss" scoped>
  .row {
    .loader {
      display: flex;
      height: 100%;
      justify-content: center;
      width: 100%;
    }
  }
</style>