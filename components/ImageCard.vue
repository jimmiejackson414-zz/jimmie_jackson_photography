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
        <div class="overlay">
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
        </div>

        <cld-image
          class="white--text d-flex align-center text-center"
          :public-id="imageSrc"
          responsive="width"
          height="auto"
          fetch-format="auto"
          quality="auto"
          width="auto"
          @contextmenu.prevent />
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
          src = this.item.source.public_id;
        } else if (this.itemType === 'images') {
          src = this.item.sources[0].public_id;
        }
        return src;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .image-card {
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