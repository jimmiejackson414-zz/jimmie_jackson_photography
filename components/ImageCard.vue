<template>
  <v-card
    class="image-card"
    flat
    nuxt
    :ripple="false"
    :to="imageLink">
    <div class="overlay">
      <h3
        v-if="itemType === 'galleries'"
        class="display-2 text--white gallery-name">
        {{ item.title }}
      </h3>
      <div class="btn-wrapper">
        <v-btn
          depressed
          :ripple="false"
          color="primary"
          class="visit-btn"
          :to="imageLink">
          {{ btnText }}
        </v-btn>
      </div>
    </div>

    <i-k-image
      :public-key="publicKey"
      :url-endpoint="urlEndpoint"
      :src="imageSrc"
      :transformation="[
        { progressive: true },
        { cropMode: 'maintain_ratio' },
        { width: '400' },
      ]"
      @contextmenu.prevent />
  </v-card>
</template>

<script>
  import { IKImage } from "imagekitio-vue";
  import { imageKitProps } from '~/mixins';

  export default {
    mixins: [imageKitProps],

    props: {
      btnText: {
        type: String,
        default: () => 'Visit',
        required: true,
      },
      item: {
        type: Object,
        default: () => {},
        required: true,
      },
      itemType: {
        type: String,
        default: () => '',
        required: true,
      }
    },

    computed: {
      imageLink() {
        return `/${this.itemType}/${this.item.slug}`;
      },
      imageSrc() {
        let src;
        if (this.itemType === 'galleries') {
          src = this.item.source.public_id;
        } else if (this.itemType === 'images') {
          src = this.item.sources[0].public_id;
        }
        return src;
      },
    },

    components: {
      IKImage,
    }
  }
</script>

<style lang="scss" scoped>
  .image-card {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    cursor: pointer;
    height: 100%;
    margin: 0 auto;
    position: relative;

    .overlay {
      align-items: center;
      background-color: rgba(255, 255, 255, 0.3);
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      left: 0;
      opacity: 0;
      position: absolute;
      right: 0;
      top: 0;
      transition: 0.2s all ease-in-out;
      visibility: hidden;
    }

    .visit-btn, .gallery-name {
      color: white;
      opacity: 0;
      transition: 0.2s all ease-in-out;
      visibility: hidden;
    }

    .gallery-name {
      font-family: 'Avenir Next', serif !important;
      font-weight: 500;
      line-height: 1.1;
      margin-bottom: 1rem;
      text-align: center;
      text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
      text-transform: uppercase;
    }

    &:hover {
      .overlay, .visit-btn, .gallery-name {
        opacity: 1;
        visibility: visible;
      }
    }

    &.theme--dark {
      background-color: var(--v-background-base,#121212)!important;
    }
  }
</style>