<template>
  <v-container class="pt-5">
    <page-title text="Download" />
    <v-row
      align="start"
      justify="center">
      <v-col
        class="column"
        cols="12"
        md="8">
        <spinner v-if="loading" />
        <div
          v-if="order && images && !isExpired"
          class="downloads-container">
          <client-only>
            <transition-group
              tag="ul"
              name="fade">
              <download-item
                v-for="download in order.images"
                :key="download.id"
                :download="download"
                :image="associatedImage" />
            </transition-group>
            <h4 class="display-1 error--text text-center mt-5">
              Note: This download page will expire {{ expirationDate }}
            </h4>
          </client-only>
        </div>
        <div
          v-else-if="isExpired"
          class="expired-container">
          <h2 class="display-1 text-center">
            This page has expired due to the 14 day download window ending. If you believe this is in error, please
            <nuxt-link to="/contact">
              contact me!
            </nuxt-link>
          </h2>
        </div>
        <div
          v-else-if="!loading && !order && !images"
          class="error-container">
          <h2 class="display-1 text-center">
            Error retrieving your downloads.
          </h2>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import orderQuery from '~/apollo/queries/order/orderByUid';
  import imageQuery from '~/apollo/queries/image/images';
  import DownloadItem from '~/components/DownloadItem';
  import PageTitle from '~/components/PageTitle';
  import Spinner from '~/components/Spinner';

  dayjs.extend(relativeTime);

  export default {
    name: 'Download',

    middleware: ['download'],

    apollo: {
      order: {
        query: orderQuery,
        variables() {
          return {
            uid: this.$route.query.uid,
          }
        }
      }
    },

    data: () => ({
      images: null,
      loading: true,
    }),

    computed: {
      associatedImage() {
        let found;
        if (this.order && this.images) {
          this.order.images.forEach(image => {
            this.images.forEach(img => {
              if (img.id === image.id) found = img;
            })
          })
        }
        return found;
      },
      expirationDate() {
        let date = '';
        let expiry = dayjs(this.order.created_at).add(2, 'week');

        if (this.order) date = dayjs(this.order.created_at).to(expiry);
        return date;
      },
      isExpired() {
        return dayjs(this.order.created_at).isAfter(dayjs(this.order.created_at).add(2, 'week'), 'day');
      }
    },

    methods: {
      fetchImages() {
        const ids = !this.order.images.length ? [-1] : this.order.images.map(image => image.id);

        this.$apollo.query({
          prefetch: false,
          query: imageQuery,
          variables: {
            ids,
          }
        })
          .then(({ data }) => this.images = data.images)
          .catch(err => console.error(err))
          .then(() => this.loading = false);
      }
    },

    watch: {
      order(value) {
        if (value) this.fetchImages();
      }
    },

    components: {
      DownloadItem,
      PageTitle,
      Spinner,
    }
  }
</script>

<style lang="scss" scoped>

</style>