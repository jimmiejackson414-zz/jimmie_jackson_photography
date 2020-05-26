<template>
  <v-dialog
    v-model="open"
    hide-overlay
    fullscreen
    persistent
    class="dialog-wrapper"
    @click:outside="closeModal"
    @keydown.esc="closeModal">
    <v-card>
      <v-img
        :src="image.media_details.sizes.full.source_url"
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
      }
    },

    methods: {
      closeModal(e) {
        e.preventDefault();
        this.$emit('handle-close-dialog');
      },
    }
  }
</script>

<style lang="scss">
  .dialog-wrapper {
    .v-img {
      pointer-events: none;
    }
  }
</style>