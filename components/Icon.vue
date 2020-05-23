<template>
  <client-only>
    <unicon
      :class="customClass"
      :name="name"
      :fill="fill"
      :height="height"
      :width="width" />
  </client-only>
</template>

<script>
  export default {
    props: {
      customClass: {
        type: String,
        default: '',
        required: false,
      },
      name: {
        type: String,
        default: '',
        required: true,
      },
      fill: {
        type: String,
        default: '#9e9e9e',
        required: false,
      },
      height: {
        type: String,
        default: '20px',
        required: false,
      },
      width: {
        type: String,
        default: '20px',
        required: false,
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>