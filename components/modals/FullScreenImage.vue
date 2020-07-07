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
          v-for="(img, i) in image.src"
          :key="i">
          <v-img
            height="100%"
            width="auto"
            :src="img.formats.large.url"
            @contextmenu.prevent>
            <v-btn
              class="close-modal float-right ma-3"
              icon
              @click.stop="closeModal">
              <icon
                name="multiply"
                fill="#fff"
                height="30px"
                width="30px" />
            </v-btn>
          </v-img>
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

    components: {
    }
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