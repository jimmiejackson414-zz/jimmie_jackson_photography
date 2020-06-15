<template>
  <v-container class="pt-5">
    <page-title :text="searchTerm" />
    <v-row
      align="start"
      justify="center">
      <v-col cols="12">
        <div
          v-if="loading"
          class="loader">
          <spinner />
        </div>
        <div class="search-results-wrapper">
          <!-- Search Result Component -->
          <div v-if="results.length">
            <client-only>
              <masonry
                :cols="{default: 2, 1000: 3, 700: 2, 400: 1}"
                :gutter="{ default: '10px', 700: '10px' }"
                style="width: 100%">
                <gallery-card
                  v-for="result in results"
                  :key="result.id"
                  :image="result" />
              </masonry>
            </client-only>
          </div>
          <div v-else>
            <h3 class="display-1 text-center">
              {{ error }}
            </h3>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';
  import searchImagesQuery from '~/apollo/queries/search/search';
  import GalleryCard from '~/components/GalleryCard';
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
        this.$apollo.query({
          query: searchImagesQuery,
          variables: {
            searchQuery: this.query,
          }
        })
          .then(({ data: { searchImages } }) => {
            if (searchImages.length) this.results = searchImages;
            else this.error = 'No results were found. Please try again.';
          })
          .then(() => this.loading = false);
      }
    },

    created() {
      this.performSearch();
    },

    components: {
      GalleryCard,
      PageTitle,
      Spinner,
    }
  }
</script>

<style lang="scss" scoped>
  .search-results-wrapper {
    width: 100%;
  }

  .row {
    width: 100%;
    height: 100px;

    .loader {
      display: flex;
      height: 100%;
      justify-content: center;
      width: 100%;
    }
  }
</style>