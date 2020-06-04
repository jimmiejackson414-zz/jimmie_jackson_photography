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
              {{ detail.value | strippedTags }}
            </p>
          </div>
          <!-- <v-form
            ref="form"
            v-model="valid">
            <v-select
              v-model="chosenSize"
              dense
              :items="availableSizes"
              label="Please choose a size"
              outlined
              required
              return-object
              item-text="label"
              item-value="value"
              :rules="[v => !!v || 'Selection is required']" />
            <v-btn
              depressed
              :ripple="false"
              color="accent"
              class="add-to-cart-btn"
              :disabled="!valid"
              @click="submit">
              Add To Cart
            </v-btn>
          </v-form> -->
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
  import { mapGetters, mapMutations } from 'vuex';
  import fetchGalleries from '~/mixins/fetchGalleries';
  import FullScreenImage from '~/components/modals/FullScreenImage';
  import PageTitle from '~/components/PageTitle';

  export default {
    mixins: [fetchGalleries],

    data: () => ({
      // availableSizes: [
      //   { text: '500dpi', value: '1' },
      //   { text: '1000dpi', value: '2' },
      //   { text: '1500dpi', value: '3' },
      //   { text: '2000dpi', value: '4' },
      //   { text: 'Full Resolution', value: '5' },
      // ],
      chosenSize: null,
      isModalOpen: false,
      snackbar: false,
      valid: false,
    }),

    computed: {
      ...mapGetters('portfolio', ['fetchImage', 'fetchImageNavigationSlugs']),
      availableSizes() {
        return this.image.acf.stripe;
      },
      backSlug() {
        return `/galleries/${this.image.acf.category.slug}`;
      },
      details() {
        return [
          { title: 'Title', value: this.image.title.rendered },
          { title: 'Location', value: this.image.acf.location },
          { title: 'Description', value: this.image.caption.rendered }
        ]
      },
      image() {
        return this.fetchImage(this.$route.params.slug);
      },
      imageSrc() {
        return this.image.media_details.sizes.large.source_url;
      },
      nextSlug() {
        return this.fetchImageNavigationSlugs(this.image).next;
      },
      pageTitle() {
        return this.image.title.rendered;
      },
      prevSlug() {
        return this.fetchImageNavigationSlugs(this.image).previous;
      }
    },

    methods: {
      ...mapMutations('cart', ['addToCart']),

      openModal() {
        this.isModalOpen = true;
      },

      submit() {
        if (this.$refs.form.validate()) {
          const payload = {
            id: this.image.id,
            chosenSize: this.chosenSize,
            image: this.image.media_details.sizes.thumbnail.source_url,
            quantity: 1,
            title: this.image.title.rendered,
          };
          this.addToCart(payload);
          this.snackbar = true;
        }
      },
    },

    filters: {
      strippedTags(string) {
        return string.replace(/<\/?[^>]+>/ig, "");
      }
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
    .detail {
      align-items: center;
      display: flex;
      justify-content: flex-start;

      p:first-of-type {
        margin-right: 1rem;
      }
    }

    form {
      .v-input {
        max-width: 75%;

        @include breakpoint(desktop) {
          max-width: 50%;
        }
      }
    }
  }

  .prev-next-wrapper {
    display: flex;
    justify-content: space-between;
  }
</style>