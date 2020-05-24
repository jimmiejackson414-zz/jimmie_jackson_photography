<template>
  <div class="page-wrapper">
    <v-container>
      <page-title
        text="Individual Image Page"
        back />
    </v-container>
    <v-container
      fluid
      class="pt-5">
      <v-row
        align="center"
        justify="center">
        <v-col
          sm="12"
          md="6"
          class="image-container">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            max-width="800px" />
        </v-col>
        <v-col
          sm="12"
          md="6"
          class="details-container">
          <h1 class="display-2 font-weight-bold mb-3">
            Details
          </h1>
          <div
            v-for="(detail, index) in details"
            :key="index"
            class="detail">
            <p class="body-1 font-weight-bold">
              {{ detail.title }}
            </p>
            <p class="body-1">
              {{ detail.value }}
            </p>
          </div>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
            <v-select
              v-model="chosenSize"
              dense
              :items="availableSizes"
              label="Available Sizes"
              outlined
              style="maxWidth: 50%;"
              required
              :rules="[v => !!v || 'Selection is required']" />
            <v-btn
              depressed
              :ripple="false"
              color="accent"
              class="add-to-cart-btn"
              :disabled="!valid"
              @click="validateAndAddToCart">
              Add To Cart
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      bottom
      left
      color="success"
      :timeout="3000">
      <icon
        name="check-circle"
        fill="white"
        height="30px"
        width="30px" />
      <p class="body-1 mb-0 font-weight-bold">
        Added To Cart
      </p>
      <v-btn
        icon
        @click="snackbar = false">
        <icon
          name="multiply"
          fill="white"
          height="20px"
          width="20px" />
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import PageTitle from '~/components/PageTitle';

  export default {
    data: () => ({
      availableSizes: [
        { text: '500dpi', value: '1' },
        { text: '1000dpi', value: '2' },
        { text: '1500dpi', value: '3' },
        { text: '2000dpi', value: '4' },
        { text: 'Full Resolution', value: '5' },
      ],
      chosenSize: null,
      details: [
        { title: 'Title: ', value: 'Morning Glory' },
        { title: 'Location: ', value: 'Arizona' },
        { title: 'Description: ', value: "There's a cool story about this photo."},
      ],
      snackbar: false,
      valid: false,
    }),

    computed: {
      test() {
        return this.$refs.imageFormRef.isValid;
      }
    },

    methods: {
      ...mapMutations('cart', ['addToCart']),

      // handleSelectChange() {
      //   console.log('this.chosenSize: ', this.chosenSize);
      //   if (this.chosenSize) this.isFormValid = true;
      //   else this.isFormValid = false;
      // },

      validateAndAddToCart() {
        if (this.$refs.form.validate()) {
          this.addToCart({ id: 2, title: 'Titties' });
          this.snackbar = true;
        }
      },
    },

    components: {
      PageTitle,
    },
  }
</script>

<style lang="scss" scoped>
  @import '~/css/breakpoints';

  .image-container {
    .v-image {
      margin: 0 auto;
    }

    @include breakpoint(desktop) {
      flex-direction: row;
    }
  }

  .details-container {
    .detail {
      align-items: center;
      display: flex;
      justify-content: flex-start;

      p:first-of-type {
        margin-right: 1rem;
      }
    }
  }
</style>