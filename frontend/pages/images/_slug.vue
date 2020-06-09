<template>
  <div class="page-wrapper">
    <v-container class="pb-0">
      <page-title
        :text="pageTitle"
        :back-slug="backSlug" />
    </v-container>
    <v-container
      fluid
      class="px-5">
      <v-row
        align="center"
        justify="center">
        <v-col
          sm="12"
          md="6"
          class="image-container">
          <v-img
            :src="imageSrc"
            max-width="800px"
            @contextmenu.prevent>
            <v-btn
              class="expand-btn"
              icon
              @click.stop="openModal">
              <icon
                name="expand-arrows-alt"
                fill="#fff"
                height="20px"
                width="20px" />
            </v-btn>
          </v-img>
        </v-col>
        <v-col
          sm="12"
          md="6"
          class="details-container">
          <h1 class="display-2 font-weight-bold mb-3">
            Story Time
          </h1>
          <p class="body-1 story">
            {{ image.description }}
          </p>
          <h1 class="display-2 font-weight-bold mb-3">
            Details
          </h1>
          <div
            v-for="(detail, index) in details"
            :key="index"
            class="detail">
            <p class="body-1 font-weight-bold">
              {{ detail.title }}:
            </p>
            <p class="body-1">
              {{ detail.value }}
            </p>
          </div>
          <v-btn
            depressed
            :ripple="false"
            color="accent"
            class="add-to-cart-btn"
            @click="submit">
            Add To Cart
          </v-btn>
        </v-col>
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
          Previous Photo
        </v-btn>
        <v-btn
          text
          :ripple="false"
          small
          nuxt
          :to="nextSlug"
          :disabled="!nextSlug"
          color="info">
          Next Photo
          <icon
            :disabled="!nextSlug"
            name="angle-right"
            fill="grey"
            height="20px"
            width="20px" />
        </v-btn>
      </v-row>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      bottom
      left
      color="success"
      :timeout="3000">
      <icon
        name="check-circle"
        fill="white"
        height="30px"
        width="30px" />
      <p class="body-1 mb-0 font-weight-bold">
        Added To Cart
      </p>
      <v-btn
        icon
        @click="snackbar = false">
        <icon
          name="multiply"
          fill="white"
          height="20px"
          width="20px" />
      </v-btn>
    </v-snackbar>
    <full-screen-image
      :image="image"
      :open="isModalOpen"
      @handle-close-dialog="isModalOpen = false" />
  </div>
</template>

<script>
  import dayjs from 'dayjs';
  import FullScreenImage from '~/components/modals/FullScreenImage';
  import PageTitle from '~/components/PageTitle';
  import imageQuery from '~/apollo/queries/image/image';

  export default {
    name: 'ImageSlug',

    apollo: {
      image: {
        prefetch: true,
        query: imageQuery,
        variables: {
          slug: 'grand-canyon'
        }
      },
    },

    transition: 'page-fade',

    data: () => ({
      isModalOpen: false,
      snackbar: false,
    }),

    computed: {
      backSlug() {
        return `/galleries/${this.image.gallery.slug}`;
      },
      details() {
        return [
          { title: 'Title', value: this.image.name },
          { title: 'Location', value: this.image.location },
          { title: 'Taken', value: dayjs(this.image.date_taken).format('MMM DD, YYYY') },
          { title: 'Size', value: this.image.attributes ? this.image.attributes[0].options[0] : '' },
          { title: 'Price', value: `$${this.image.price}` },
        ]
      },
      imageSrc() {
        return this.image.src.formats.large.url;
      },
      nextSlug() {
        return '/';
      },
      pageTitle() {
        return this.image.name;
      },
      prevSlug() {
        return '/';
      },
      test() {
        return this.$apollo.query;
      }
    },

    methods: {
      openModal() {
        this.isModalOpen = true;
      },

      submit() {
        const payload = {
          id: this.image.id,
          image: this.image.src,
          quantity: 1,
          title: this.image.name,
        };
        this.addToCart(payload);
        this.snackbar = true;
      },
    },

    components: {
      FullScreenImage,
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

  .image-container {
    .v-image {
      margin: 0 auto;

      .expand-btn {
        cursor: pointer;
        float: right;
        opacity: 0;
        padding: 1rem;
        transition: 0.2s all ease-in-out;
        visibility: hidden;
      }

      &:hover {
        .expand-btn {
          opacity: 1;
          visibility: visible;
        }
      }
    }

    @include breakpoint(desktop) {
      flex-direction: row;
    }
  }

  .details-container {
    .story {
      margin-bottom: 5rem;
    }

    .detail {
      align-items: center;
      display: flex;
      justify-content: flex-start;

      p:first-of-type {
        margin-right: 1rem;
      }
    }
  }

  .prev-next-wrapper {
    display: flex;
    justify-content: space-between;
  }
</style>