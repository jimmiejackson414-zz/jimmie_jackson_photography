<template>
  <div>
    <client-only>
      <page-title :text="searchTerm" />
      <v-row
        class="mx-auto"
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
              <v-container justify-center>
                <v-row
                  justify-center
                  class="mx-auto h-100">
                  <gallery-card
                    v-for="result in results"
                    :key="result.id"
                    :image="result" />
                </v-row>
              </v-container>
            </div>
            <div v-else>
              <h3 class="display-1 text-center">
                {{ error }}
              </h3>
            </div>
          </div>
        </v-col>
      </v-row>
    </client-only>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import query from '~/apollo/queries/search/search';
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
          query,
          variables: {
            searchQuery: this.query,
          }
        })
          .then(({ data: { images } }) => {
            if (images && images.length) this.results = images;
            else this.error = 'No results were found. Please try again.';
          })
          .catch(err => console.error(err))
          .then(() => this.loading = false);
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
      GalleryCard,
      PageTitle,
      Spinner,
    }
  }
</script>

<style lang="scss" scoped>
  .search-results-wrapper {
    width: 100%;

    .results-container {
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: 1fr;
    }
  }

  .row {
    width: 100%;

    .loader {
      display: flex;
      height: 100%;
      justify-content: center;
      width: 100%;
    }
  }
</style>