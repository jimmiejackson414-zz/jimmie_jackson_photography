<template>
  <v-col
    cols="12"
    md="6"
    xl="4"
    class="px-1 py-1">
    <v-lazy
      v-model="isActive"
      :options="{ threshold: .5 }"
      min-height="200"
      transition="fade-transition">
      <nuxt-link :to="{ name: 'galleries-slug', params: { slug: gallery.slug } }">
        <div
          class="portfolio-card"
          :style="{background: `url(${imageSrc}) no-repeat center center`}"
          @contextmenu.prevent>
          <div class="overlay" />
          <p class="display-3 font-weight-bold gallery-title">
            {{ gallery.name }}
          </p>
          <v-btn
            depressed
            :ripple="false"
            color="primary"
            class="visit-btn"
            :to="{ name: 'galleries-slug', params: { slug: gallery.slug }}">
            Visit Gallery
          </v-btn>
        </div>
      </nuxt-link>
    </v-lazy>
  </v-col>
</template>

<script>
  export default {
    props: {
      gallery: {
        type: Object,
        default: () => ({})
      },
    },

    data: () => ({
      isActive: false,
    }),

    computed: {
      imageSrc() {
        return this.gallery.images[0].src.formats.small.url || 'https://via.placeholder.com/500';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .portfolio-card {
    align-items: center;
    background-size: cover;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 400px;
    justify-content: center;
    position: relative;
    max-width: 100%;

    .overlay {
      background-color: rgba(255, 255, 255, 0.3);
      bottom: 0;
      left: 0;
      opacity: 0;
      position: absolute;
      right: 0;
      top: 0;
      transition: 0.2s all ease-in-out;
      visibility: hidden;
    }

    .gallery-title {
      color: white;
      text-shadow: 3px 3px rgba(0, 0, 0, 0.25);
      transition: 0.2s all ease-in-out;
    }

    .visit-btn {
      opacity: 0;
      transition: 0.2s all ease-in-out;
      visibility: hidden;
    }

    &:hover {
      .overlay, .visit-btn {
        opacity: 1;
        visibility: visible;
      }
    }
  }
</style>