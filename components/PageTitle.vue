<template>
  <div class="page-title-wrapper">
    <v-btn
      v-if="back"
      text
      :ripple="false"
      nuxt
      class="back-wrapper"
      @click="to">
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
      back: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        default: 'Page'
      }
    },

    methods: {
      to() {
        this.$router.go(-1);
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/css/breakpoints';

  .page-title-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;

    @include breakpoint(desktop) {
      flex-direction: row;
      margin-bottom: 4rem;
    }

    .back-wrapper {
      align-items: center;
      display: flex;
      justify-content: flex-start;
      margin-bottom: 1rem;

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