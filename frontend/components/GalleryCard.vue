<template>
  <v-card
    class="image-card"
    elevation="0"
    nuxt
    :ripple="false"
    :to="{ name: 'images-slug', params: { slug: image.slug }}">
    <v-img
      class="white--text d-flex align-center text-center"
      contain
      min-width="100%"
      :src="imageSrc"
      @contextmenu.prevent>
      <div class="overlay" />
      <div class="btn-wrapper">
        <v-btn
          depressed
          nuxt
          :ripple="false"
          color="primary"
          class="visit-btn"
          :to="{ name: 'images-slug', params: { slug: image.slug }}">
          View
        </v-btn>
      </div>
    </v-img>
  </v-card>
</template>

<script>
  export default {
    props: {
      image: {
        type: Object,
        default: () => ({})
      }
    },

    computed: {
      imageSrc() {
        return this.image.src.formats.small.url;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .image-card {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    margin-bottom: 1rem;
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

    .btn-wrapper {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .visit-btn {
        margin-bottom: 1rem;
      }

      .visit-btn, .add-to-cart-btn {
        opacity: 0;
        transition: 0.2s all ease-in-out;
        visibility: hidden;
      }
    }

    &:hover {
      .overlay, .visit-btn, .add-to-cart-btn {
        opacity: 1;
        visibility: visible;
      }
    }
  }
</style>