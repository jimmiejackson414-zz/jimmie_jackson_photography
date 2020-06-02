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
              :disabled="!hasOrderItems"
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
              :disabled="!hasOrderItems"
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
              :disabled="!hasOrderItems"
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
              @click="checkout">
              <span v-if="!loading">Pay ${{ amount / 100 }}</span>
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
          <span v-if="hasOrderItems">
            <transition-group
              tag="ul"
              name="list">
              <order-item
                v-for="item in orderItems"
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
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';
  import OrderItem from '~/components/OrderItem';
  import PageTitle from '~/components/PageTitle';
  import Spinner from '~/components/Spinner';

  export default {
    name: 'Cart',

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
      loading: false,
      nameRules: [
        v => !!v || 'Name is required.',
      ],
      stripe: null,
      successfulResult: false,
    }),

    computed: {
      ...mapState({
        orderItems: state => state.cart.items,
      }),
      hasOrderItems() {
        return this.orderItems.length > 0;
      },
      amount() {
        return 1000;
      }
    },

    methods: {
      checkout() {
        console.log('checkout');
        this.loading = true;
        // when the customer clicks on the button, redirect them to checkout
        this.stripe.redirectToCheckout({
          lineItems: [{ price: 'price_HO9S89fpcCB1CJ', quantity: 1 }],
          mode: 'payment',
          // do not rely on the redirect to the successUrl for fulfilling purchases, customers
          // may not always reach the successUrl after a successful payment.
          // instead use one of the strategies described in https://stripe.com/docs/payments/checkout/fulfillment
          successUrl: window.location.protocol + '//www.jimmiejacksonphotography.com/cart',
          cancelUrl: window.location.protocol + '//www.jimmiejacksonphotography.com/cart',
        })
          .then(result => {
            console.log('result: ', result);
            this.loading = false;
            if (result.error) {
              // if `redirectToCheckout` fails due to a browser or network error, display the localized
              // error message to your customer
              this.error = result.error.message;
            }
          })
      },
      initializeStripe() {
        // eslint-disable-next-line no-undef
        this.stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);
      }
    },

    watch: {
      isStripeLoaded() {
        if (this.isStripeLoaded) this.initializeStripe();
      }
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
        ]
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

  .list-enter-active,
  .list-leave-active,
  .list-move {
    transition: 250ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
    transition-property: opacity, transform;
  }

  .list-enter {
    opacity: 0;
    transform: translateX(50px) scaleY(0.5);
  }

  .list-enter-to {
    opacity: 1;
    transform: translateX(0) scaleY(1);
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