<template>
  <v-card
    class="image-card"
    elevation="0"
    nuxt
    :to="{ name: 'images-slug', params: { slug: 'test' }}">
    <v-img
      class="white--text d-flex align-center text-center"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      <div class="overlay" />
      <v-btn
        depressed
        nuxt
        :ripple="false"
        color="info"
        class="visit-btn"
        :to="{ name: 'images-slug', params: { slug: 'test' }}">
        View
      </v-btn>
    </v-img>
  </v-card>
</template>

<script>
  export default {
    computed: {
      gallery() {
        return 'arizona';
      },
      image() {
        return 'test';
      },
    }
  }
</script>

<style lang="scss" scoped>
  .image-card {
    align-items: center;
    background: url('/backgrounds/grand_canyon.jpg') no-repeat center center;
    background-size: cover;
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
      opacity: 0%;
      position: absolute;
      right: 0;
      top: 0;
      transition: 0.2s all ease-in-out;
      visibility: hidden;
    }

    .visit-btn {
      opacity: 0;
      transition: 0.2s all ease-in-out;
      visibility: hidden;
    }

    &:hover {
      .overlay, .visit-btn {
        opacity: 100%;
        visibility: visible;
      }
    }
  }
</style>