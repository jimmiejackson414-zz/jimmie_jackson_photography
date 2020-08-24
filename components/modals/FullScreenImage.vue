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
          v-for="(img, i) in image.sources"
          :key="i">
          <span
            class="close-btn"
            @click="closeModal">
            <icon
              name="multiply"
              fill="white"
              height="30px"
              width="30px" />
          </span>
          <i-k-image
            class="w-100"
            :public-key="publicKey"
            :url-endpoint="urlEndpoint"
            :src="img.public_id"
            sizes="100vw"
            :lqip="{ active: true, threshold: 10 }"
            :transformation="[
              { progressive: true },
              { cropMode: 'maintain_ratio' },
              { width: '1500' },
              { f: 'auto' },
              { dpr: 'auto' },
            ]"
            @contextmenu.prevent />
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </v-dialog>
</template>

<script>
  import { IKImage } from 'imagekitio-vue';
  import { imageKitProps } from '~/mixins';

  export default {
    mixins: [imageKitProps],

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
        console.log('close');
        this.$emit('handle-close-dialog');
      },
    },

    components: {
      IKImage,
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

  .ik-image {
    height: 100%;
  }

  .close-btn {
    cursor: pointer;
    opacity: 0;
    position: absolute;
    right: 10px;
    top: 10px;
    transition: 0.2s opacity cubic-bezier(0.23, 1, 0.320, 1);
  }

  .v-dialog {
    &:hover {
      .close-btn {
        opacity: 1;
      }
    }
  }
</style>