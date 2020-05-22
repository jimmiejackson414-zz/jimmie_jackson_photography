<template>
  <v-content>
    <div class="gallery-container">
      <!-- Use v-lazy for scrolling large galleries -->
      <button @click="addToCart({ id: 1, title: 'Test' })">
        Add
      </button>
      <button @click="removeFromCart({ id: 1, title: 'Test'})">
        Remove
      </button>
    </div>
  </v-content>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    methods: {
      ...mapMutations('cart', ['addToCart', 'removeFromCart']),
    }
  }
</script>

<style lang="scss" scoped>

</style>