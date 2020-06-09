<template>
  <li class="item-wrapper">
    <v-img
      :src="item.image"
      max-width="100px" />
    <div class="details">
      <p class="font-weight-bold display-1 mb-1">
        {{ item.title }}
      </p>
    </div>
    <div class="quantity">
      <v-text-field
        v-model="quantity"
        type="number"
        color="primary"
        outlined
        dense
        label="Quantity"
        name="quantity"
        required />
    </div>
    <div class="remove-item">
      <v-btn
        icon
        :ripple="false"
        @click.stop="remove">
        <icon
          name="multiply"
          height="30px"
          width="30px" />
      </v-btn>
    </div>
  </li>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    props: {
      item: {
        type: Object,
        default: () => ({})
      }
    },

    data: () => ({
      quantity: 1
    }),

    methods: {
      ...mapMutations('cart', ['removeFromCart']),
      remove() {
        this.removeFromCart(this.item);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/css/global';

  .item-wrapper {
    display: grid;
    grid-gap: 1.5rem;
    grid-template-columns: auto 1fr 1fr auto;
    padding: 1.6rem;

    &:not(:last-child) {
      border-bottom: 1px solid $light-grey;
    }

    .quantity {
      max-width: 10rem;
    }
  }
</style>

<style lang="scss">
  @import '~/css/global';

  .remove-item {
    svg path {
      transition: 0.2s all ease-in-out;

      &:hover {
        fill: $secondary;
      }
    }
  }
</style>