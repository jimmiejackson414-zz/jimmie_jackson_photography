<template>
  <client-only>
    <v-col
      cols="12"
      sm="6"
      md="6"
      lg="4"
      xl="3">
      <v-card
        class="image-card"
        flat
        nuxt
        :ripple="false"
        :to="imageLink">
        <v-img
          class="white--text d-flex align-center text-center"
          contain
          :src="imageSrc"
          :alt="item.name + ' Gallery'"
          @contextmenu.prevent>
          <div class="overlay" />
          <h3
            v-if="itemType === 'galleries'"
            class="display-3 text--white gallery-name">
            {{ item.name }}
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
        </v-img>
      </v-card>
    </v-col>
  </client-only>
</template>

<script>
  export default {
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
          src = this.item.cover_image.url;
        } else if (this.itemType === 'images') {
          src = this.item.src[0].formats.small.url;
        }
        return src;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .image-card {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    position: relative;

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

    .visit-btn, .gallery-name {
      opacity: 0;
      transition: 0.2s all ease-in-out;
      visibility: hidden;
    }

    .gallery-name {
      font-family: 'Exo 2', serif !important;
      font-weight: 500;
      margin-bottom: 1rem;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, .9);
    }

    &:hover {
      .overlay, .visit-btn, .gallery-name {
        opacity: 1;
        visibility: visible;
      }
    }
  }
</style>