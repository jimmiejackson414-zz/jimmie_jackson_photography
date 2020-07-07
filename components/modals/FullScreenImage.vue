<template>
  <v-dialog
    v-model="open"
    transition="fade"
    overlay-color="#000"
    overlay-opacity=".75"
    max-width="90%"
    max-height="fit-content"
    content-class="dialog-wrapper"
    @click:outside="closeModal"
    @keydown.esc="closeModal">
    <v-card
      elevation="0"
      rounded="0"
      style="min-height: fit-content">
      <v-carousel
        continuous
        height="auto"
        hide-delimiter-background
        show-arrows-on-hover>
        <v-carousel-item
          v-for="(img, i) in image"
          :key="i">
          <cld-image
            :public-id="image.sources[0].public_id"
            responsive="width"
            :alt="image.name"
            max-width="800px"
            height="auto"
            fetch-format="auto"
            quality="auto"
            @contextmenu.prevent />
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </v-dialog>
</template>

<script>

  export default {
    props: {
      image: {
        type: Object,
        default: () => ({})
      },
      open: {
        type: Boolean,
        default: false,
      },
    },

    methods: {
      closeModal() {
        this.$emit('handle-close-dialog');
      },
    },
  }
</script>

<style lang="scss">
  .dialog-wrapper.v-dialog {
    border-radius: 0;

    &.v-dialog:not(.v-dialog--fullscreen) {
      max-height: fit-content;
    }

    .v-card {
      min-height: fit-content;

      .v-img {
        pointer-events: none;
      }
    }

  }
</style>