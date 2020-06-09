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
        const searchQuery = this.query.replace(/\s+/g, '-').toLowerCase();
        // await this.$axios.$get(`${process.env.WP_API_URL}/relevanssi/v1/search?type=post&keyword=${searchQuery}&consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`)
        await this.$axios.$get(`${process.env.WP_API_URL}/wc/v3/products?search=${searchQuery}&consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`)
          .then(res => {
            if (!res.length) this.error = 'No results were found. Please try again.';
            this.results = res;
          })
          .catch(() => this.error = 'An error occurred. Please try again.');

        this.loading = false;
      }
    },

    watch: {
      query() {
        console.log('this.query: ', this.query);
        if (this.query) this.performSearch();
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