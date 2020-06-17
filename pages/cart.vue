<template>
  <v-container class="pt-5">
    <page-title text="Cart" />
    <v-row
      align="start"
      justify="center">
      <v-col
        class="column"
        cols="12"
        md="5">
        <div class="payment-personals-wrapper">
          <div class="personal-details">
            <p class="display-1 section-title">
              Personal Details
            </p>
            <!-- Email -->
            <v-text-field
              v-model="email"
              outlined
              dense
              color="primary"
              :disabled="!hasCartItems"
              label="Email *"
              name="email"
              type="email"
              :rules="emailRules"
              required />

            <!-- First Name -->
            <v-text-field
              v-model="firstName"
              outlined
              dense
              color="primary"
              :disabled="!hasCartItems"
              label="First Name *"
              name="firstName"
              :rules="nameRules"
              required />

            <!-- Last Name -->
            <v-text-field
              v-model="lastName"
              outlined
              dense
              color="primary"
              :disabled="!hasCartItems"
              label="Last Name *"
              name="lastName"
              :rules="nameRules"
              required />
          </div>
          <div class="payment-details">
            <p class="display-1 section-title">
              Payment Details
            </p>
            <v-btn
              color="primary"
              refs="checkoutBtn"
              :disabled="!isStripeLoaded || !complete"
              @click="checkout">
              <span v-if="!submitting">Continue to Checkout</span>
              <Spinner v-else />
            </v-btn>
            <span class="error">{{ error }}</span>
          </div>
        </div>
      </v-col>
      <v-col
        class="column"
        cols="12"
        md="7">
        <div class="order-details-wrapper">
          <p class="display-1 section-title">
            Order Details
          </p>
          <client-only>
            <span v-if="!$apollo.loading && hasCartItems">
              <transition-group
                tag="ul"
                name="list">
                <order-item
                  v-for="item in images"
                  :key="item.id"
                  :item="item" />
              </transition-group>
            </span>
            <span v-else>
              <p class="body-1">You have no items in your cart. Visit my portfolio to add items to your cart.</p>
              <v-btn
                color="primary"
                :ripple="false"
                depressed
                nuxt
                to="/portfolio">View Portfolio</v-btn>
            </span>
          </client-only>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';
  import cartItemsQuery from '~/apollo/queries/cart/images';
  import OrderItem from '~/components/OrderItem';
  import PageTitle from '~/components/PageTitle';
  import Spinner from '~/components/Spinner';

  export default {
    name: 'Cart',

    transition: 'page-fade',

    apollo: {
      images: {
        prefetch: false,
        query: cartItemsQuery,
        variables() {
          return {
            ids: !this.cartItems.length ? [-1] : this.cartItems.map(item => item.id),
          }
        }
      },
    },

    data: () => ({
      canceledResult: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      error: null,
      firstName: '',
      isStripeLoaded: false,
      lastName: '',
      nameRules: [
        v => !!v || 'Name is required.',
      ],
      stripe: null,
      submitting: false,
      successfulResult: false,
    }),

    computed: {
      ...mapState({
        cartItems: state => state.cart.items,
      }),
      complete() {
        return this.email && this.firstName && this.lastName;
      },
      hasCartItems() {
        return this.cartItems && this.cartItems.length > 0;
      },
      flattenedLineItems() {
        return this.cartItems.reduce((acc, item) => {
          const found = acc.some(a => a.price === item.chosenSize.value);
          if (!found) acc.push({ price: item.chosenSize.value, quantity: item.quantity })
          else acc.find(a => a.price === item.chosenSize.value).quantity++;
          return acc;
        }, []);
      }
    },

    methods: {
      checkout() {
        this.submitting = true;
        this.submitting = false;
      },
    },

    components: {
      OrderItem,
      PageTitle,
      Spinner,
    },


    head() {
      return {
        script: [
          {
            hid: 'stripe',
            src: 'https://js.stripe.com/v3',
            defer: true,
            callback: () => { this.isStripeLoaded = true }
          }
        ],
        title: 'Cart'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/css/global';

  .container {
    .column {
      &:first-child {
        padding: 12px 4rem 12px 12px;
      }

      &:nth-child(2) {
        padding: 12px 12px 12px 4rem;
      }

      .section-title {
        border-bottom: 1px solid $light-grey;
      }

      .payment-personals-wrapper {
        .personal-details {
          margin-bottom: 3rem;
        }

        .payment-details {
          .stripe-card {
            margin-bottom: 2rem;
          }
        }
      }
    }
  }

  .list-leave-active,
  .list-move {
    transition: 250ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
    transition-property: opacity, transform;
  }

  .list-enter {
    opacity: 0;
  }

  .list-enter-to {
    opacity: 1;
  }

  .list-leave-active {
    position: absolute;
  }

  .list-leave-to {
    opacity: 0;
    transform: translateX(50px) scaleY(0);
    transform-origin: center top;
  }
</style>