<template>
  <div class="page-title-wrapper">
    <nuxt-link
      v-if="back"
      :to="to"
      class="back-wrapper">
      <icon
        name="angle-left"
        fill="#9e9e9e"
        height="20px"
        width="20px"
        class="d-flex" />
      <p class="display-1 grey--text">
        Back
      </p>
    </nuxt-link>
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
  .page-title-wrapper {
    display: flex;
    margin-bottom: 4rem;

    .back-wrapper {
      align-items: center;
      display: flex;
      justify-content: flex-start;

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