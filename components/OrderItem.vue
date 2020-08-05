<template>
  <li
    class="item-wrapper"
    @contextmenu.prevent>
    <i-k-image
      :public-key="publicKey"
      :url-endpoint="urlEndpoint"
      :src="item.sources[0].public_id"
      sizes="100vw"
      :lqip="{ active: true, threshold: 10 }"
      :transformation="[
        { progressive: true },
        { cm: 'maintain_ratio' },
        { width: '100' },
        { f: 'auto' },
        { dpr: 'auto' }
      ]"
      @contextmenu.prevent />
    <div class="details">
      <h3 class="font-weight-bold display-1 mb-1">
        {{ item.name }}
      </h3>
    </div>
    <div class="quantity">
      <v-text-field
        v-model="quantity"
        type="number"
        color="primary"
        outlined
        hide-details
        dense
        label="Quantity"
        name="quantity"
        required />
    </div>
    <div class="price-wrapper">
      <span class="price body-2">
        Price:
      </span>
      <span class="amount body-1 font-weight-bold">{{ price }}</span>
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
  import numeral from 'numeral';
  import { IKImage } from 'imagekitio-vue';
  import { imageKitProps } from '~/mixins';

  export default {
    mixins: [imageKitProps],

    props: {
      item: {
        type: Object,
        default: () => ({})
      },
    },

    data: () => ({
      quantity: 1
    }),

    computed: {
      price() {
        return numeral(this.item.price).format('$0,0.00');
      },
    },

    methods: {
      ...mapMutations('cart', ['removeFromCart']),
      remove() {
        this.removeFromCart(this.item);
      }
    },

    components: {
      IKImage,
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/css/global';

  .item-wrapper {
    align-items: center;
    display: grid;
    grid-gap: 1.75rem;
    grid-template-columns: auto minmax(100px, 200px) repeat(3, auto);
    padding: 1.6rem;

    &:not(:last-child) {
      border-bottom: 1px solid $light-grey;
    }

    .quantity {
      max-width: 10rem;
    }

    .price-wrapper {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>

<style lang="scss">
  @import '~/css/global';

  .remove-item {
    align-self: center;

    svg path {
      transition: 0.2s all ease-in-out;

      &:hover {
        fill: $secondary;
      }
    }
  }
</style>