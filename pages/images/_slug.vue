<template>
  <div class="page-wrapper">
    <client-only>
      <v-container class="pb-0">
        <page-title
          :text="pageTitle"
          :back-slug="backSlug" />
      </v-container>
      <v-container
        fluid
        class="px-5">
        <v-row
          align="start"
          justify="center">
          <div
            class="image-container col-12 col-md-6">
            <v-carousel
              height="auto"
              continuous
              hide-delimiters
              show-arrows-on-hover>
              <v-carousel-item
                v-for="(img, i) in image"
                :key="i"
                @click.stop="openModal"
                @contextmenu.prevent>
                <v-btn
                  class="expand-btn"
                  icon
                  :ripple="false"
                  @click.stop="openModal">
                  <icon
                    name="expand-arrows-alt"
                    fill="#fff"
                    height="20px"
                    width="20px" />
                </v-btn>
                <client-only>
                  <i-k-image
                    class="pointer"
                    :public-key="publicKey"
                    :url-endpoint="urlEndpoint"
                    :src="imageSrc"
                    sizes="100vw"
                    :lqip="{ active: true, threshold: 10 }"
                    :transformation="[
                      { progressive: true },
                      { cm: 'maintain_ratio' },
                      { width: '1000' },
                      { f: 'auto' },
                      { dpr: 'auto' }
                    ]"
                    @contextmenu.prevent />
                </client-only>
              </v-carousel-item>
            </v-carousel>
          </div>
          <div
            class="details-container col-12 col-md-6">
            <h2 class="display-2 font-weight-bold mb-3">
              Story Time
            </h2>
            <p class="body-1 story">
              {{ image.description }}
            </p>
            <h2 class="display-2 font-weight-bold mb-3">
              Details
            </h2>
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
          </div>
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
        <v-spacer />
        <template v-slot:action="{ attrs }">
          <v-btn
            icon
            color="success"
            :ripple="false"
            v-bind="attrs"
            @click="snackbar = false">
            <icon
              name="multiply"
              fill="white"
              height="20px"
              width="20px" />
          </v-btn>
        </template>
      </v-snackbar>
      <full-screen-image
        :image="image"
        :open="isModalOpen"
        @handle-close-dialog="closeModal" />
    </client-only>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { IKImage } from 'imagekitio-vue';
  import dayjs from 'dayjs';
  import FullScreenImage from '~/components/modals/FullScreenImage';
  import PageTitle from '~/components/PageTitle';
  import { imageKitProps, fetchGalleries } from '~/mixins';

  export default {
    name: 'ImageSlug',

    transition: 'page-fade',

    mixins: [imageKitProps, fetchGalleries],

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
          { title: 'Title', value: this.image.title },
          { title: 'Location', value: this.image.location },
          { title: 'Taken', value: dayjs(this.image.date_taken).format('MMM DD, YYYY') },
          { title: 'Size', value: this.image.size_description },
          { title: 'Price', value: `$${this.image.price}` },
        ]
      },
      fetchImageNavigationSlugs() {
        let steps = { next: null, previous: null };
        const parentGallery = this.galleries.find(gallery => gallery.slug === this.image.gallery.slug);
        const currentImageIndex = parentGallery.images.indexOf(this.image);

        // if next image exists
        if (parentGallery.images[currentImageIndex + 1]) {
          steps['next'] = `/images/${parentGallery.images[currentImageIndex + 1].slug}`;
        }

        // if previous image exists
        if (parentGallery.images[currentImageIndex - 1]) {
          steps['previous'] = `/images/${parentGallery.images[currentImageIndex - 1].slug}`;
        }

        return steps;
      },
      image() {
        let img;
        this.galleries.forEach(gallery => {
          return gallery.images.forEach(image => {
            if (image.slug === this.$route.params.slug) return img = image;
          });
        });
        return img;
      },
      imageSrc() {
        return this.image.sources[0].public_id;
      },
      pageTitle() {
        return this.image.title;
      },
      prevSlug() {
        return this.fetchImageNavigationSlugs.previous;
      },
      nextSlug() {
        return this.fetchImageNavigationSlugs.next;
      },
    },

    methods: {
      ...mapMutations('cart', ['addToCart']),
      closeModal() {
        this.isModalOpen = false;
      },
      openModal() {
        this.isModalOpen = true;
      },

      submit() {
        const payload = {
          id: this.image.id,
          quantity: 1,
        };
        this.addToCart(payload);
        this.snackbar = true;
      },
    },

    components: {
      FullScreenImage,
      IKImage,
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
        opacity: 0;
        padding: 1rem;
        position: absolute;
        right: 0;
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

<style lang="scss">
  .v-snack__content {
    align-items: center;
    display: flex;

    .unicon {
      margin-right: 1rem;
    }
  }
</style>