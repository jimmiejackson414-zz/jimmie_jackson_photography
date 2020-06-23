<template>
  <li class="download-item">
    <v-img
      :src="imageSrc"
      max-width="200px"
      @contextmenu.prevent />
    <v-btn
      icon
      :ripple="false"
      class="download-btn"
      @click.stop="handleDownload">
      <icon
        name="image-download"
        fill="#0077be"
        height="30px"
        width="30px" />
      <span class="body-2 primary--text">Click to download</span>
    </v-btn>
  </li>
</template>

<script>
  export default {
    props: {
      download: {
        type: Object,
        default: () => ({})
      },
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

    methods: {
      handleDownload() {
        console.log('handleDownload')
        window.open(this.image.src.url);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/css/global';

  .download-item {
    align-items: center;
    border-bottom: 1px solid $light-grey;
    display: flex;
    justify-content: space-around;
    padding: 2rem;
  }
</style>

<style lang="scss">
  .download-btn {
    .v-btn__content {
      display: flex;
      flex-direction: column;
    }
  }
</style>