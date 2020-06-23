<template>
  <div class="row page-title-wrapper mx-0">
    <v-btn
      v-if="backSlug"
      text
      :ripple="false"
      nuxt
      class="back-wrapper"
      :to="backSlug">
      <icon
        name="angle-left"
        fill="#9e9e9e"
        height="20px"
        width="20px"
        class="d-flex" />
      <p class="body-1 grey--text">
        Back
      </p>
    </v-btn>
    <h1 class="display-3 text-center page-title">
      {{ text }}
    </h1>
    <div class="empty" />
  </div>
</template>

<script>
  export default {
    props: {
      backSlug: {
        type: String,
        default: '',
      },
      text: {
        type: String,
        default: 'Page'
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '~/css/breakpoints';

  .page-title-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    margin-top: 4rem;

    @include breakpoint(desktop) {
      flex-direction: row;
      margin-bottom: 4rem;
      margin-top:2rem;
    }

    .back-wrapper {
      align-items: center;
      display: flex;
      justify-content: flex-start;
      margin-bottom: 1rem;
      position: absolute;

      @include breakpoint(desktop) {
        margin-bottom: 0;
      }

      p {
        margin: 0;
      }
    }

    .back-wrapper, .empty {
      flex: 0;
    }

    .page-title {
      flex-grow: 1;
    }
  }
</style>