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
            <card
              :class="['stripe-card', { complete }]"
              :stripe="stripeKey"
              @change="complete = $event.complete" />
            <v-btn
              color="primary"
              :disabled="!complete"
              @click="purchase">
              Pay {{ orderTotal }}
            </v-btn>
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
            <order-item
              v-for="(item, index) in orderItems"
              :key="index"
              :item="item" />
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
  import { Card, createToken } from 'vue-stripe-elements-plus';
  import OrderItem from '~/components/OrderItem';
  import PageTitle from '~/components/PageTitle';

  export default {
    data: () => ({
      complete: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      firstName: '',
      isStripeLoaded: false,
      lastName: '',
      nameRules: [
        v => !!v || 'Name is required.',
      ],
      stripeKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),

    computed: {
      ...mapState({
        orderItems: state => state.cart.items,
      }),
      hasOrderItems() {
        return this.orderItems.length > 0;
      },
      orderTotal() {
        return '$10';
      }
    },

    methods: {
      async purchase() {
        // let result = await stripe.createToken(card);
        createToken()
          .then(data => console.log(data.token))
          .catch(err => console.log(err));
      }
    },

    components: {
      Card,
      OrderItem,
      PageTitle,
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

      .order-details-wrapper {

      }
    }
  }
</style>