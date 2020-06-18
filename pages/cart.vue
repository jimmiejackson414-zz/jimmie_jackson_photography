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
          <client-only>
            <v-form
              ref="form"
              v-model="valid"
              @submit.stop.prevent="handleSubmit">
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

                <!-- Card -->
                <card
                  ref="card-stripe"
                  :class="['stripe-card', { complete }]"
                  :stripe="stripeKey"
                  @change="complete = $event.complete" />
                <p class="subtitle-1">
                  Payment secured using Stripe&copy;
                </p>

                <!-- Submit Button -->
                <v-btn
                  color="primary"
                  refs="checkoutBtn"
                  :disabled="!complete && !valid"
                  class="mt-5"
                  block
                  large
                  type="submit">
                  <span v-if="!submitting">Pay ${{ amount }}</span>
                  <Spinner v-else />
                </v-btn>
                <p class="body-1 payment-disclaimer">
                  *Upon successful purchase, an email will be sent to the one provided above with a download link along with an invoice of your payment.
                </p>
                <span class="error">{{ error }}</span>
              </div>
            </v-form>
          </client-only>
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
  import { mapMutations, mapState } from 'vuex';
  import cartItemsQuery from '~/apollo/queries/cart/images';
  import createOrderMutation from '~/apollo/mutations/cart/order';
  import { Card, createToken } from 'vue-stripe-elements-plus';
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
      amount: '',
      complete: false,
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
      valid: false,
    }),

    computed: {
      ...mapState({
        cartItems: state => state.cart.items,
      }),
      hasCartItems() {
        return this.cartItems && this.cartItems.length > 0;
      },
      stripeKey() {
        return process.env.STRIPE_PUBLISHABLE_KEY;
      }
    },

    methods: {
      ...mapMutations('cart', ['clearCart']),
      async handleSubmit() {
        this.submitting = true;

        await createToken()
          .then(async ({ token }) => {
            console.log('token: ', token);
            await this.$apollo.mutate({
              mutation: createOrderMutation,
              variables: {
                amount: this.amount,
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                images: JSON.stringify(this.cartItems),
                token: token.id
              }
            })
              .then(({ data }) => {
                if (data.createOrder.order) {
                  this.clearCart();
                  this.$router.push('/thanks');
                }
                console.log('success data: ', data)
              })
              .catch(err => console.error('mutate error: ', err))
            this.submitting = false;
          })
          .catch(err => {
            this.submitting = false;
            console.error('stripe error: ', err);
          });
        this.submitting = false;
      },
    },

    watch: {
      images(value) {
        if (value) this.amount = this.images.reduce((acc, item) => acc += item.price, 0);
      }
    },

    components: {
      Card,
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

          .payment-disclaimer {
            border-top: 1px solid $light-grey;
            line-height: 1.8rem;
            margin-top: 2rem;
            padding-top: 1rem;
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

<style lang="scss">
  @import '~/css/global.scss';

  .stripe-card {
    border: 1px solid rgba(0, 0, 0, 0.38);
    border-radius: 4px;
    padding: 8px 12px;
    margin-bottom: 0.5rem !important;

    &.complete {
      border-color: $primary;
    }
  }
</style>