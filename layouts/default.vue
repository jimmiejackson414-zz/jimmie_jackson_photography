<template>
  <v-app
    light
    app>
    <v-app-bar
      id="home-app-bar"
      fixed
      elevate-on-scroll
      app>
      <v-toolbar-title>
        <nuxt-link to="/">
          <v-img
            src="/JJP_Logo_Black_V2.png"
            class="logo" />
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <div
        class="right-menu-wrapper d-flex align-items-center mr-4">
        <v-btn
          icon
          :ripple="false"
          class="hidden-sm-and-down mr-4">
          <icon
            name="search"
            fill="gray"
            height="20px"
            width="20px" />
        </v-btn>
        <v-tabs
          class="hidden-sm-and-down"
          optional>
          <v-tab
            v-for="(item, i) in items"
            :key="i"
            :exact="item.title === 'Home'"
            :to="item.to"
            :ripple="false"
            active-class="text--primary"
            class="font-weight-bold nav-link"
            min-width="96"
            nuxt
            text>
            <v-badge
              v-if="item.badge && hasCartItems"
              color="red"
              :content="cartItems"
              :value="cartItems"
              class="default-badge"
              overlap>
              {{ item.title }}
            </v-badge>
            <span v-else>{{ item.title }}</span>
          </v-tab>
        </v-tabs>
      </div>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer" />
    </v-app-bar>

    <home-drawer
      v-model="drawer"
      :items="items"
      :cart-items="cartItems" />
    <v-content>
      <transition
        name="fade"
        mode="out-in">
        <nuxt />
      </transition>
    </v-content>
    <v-footer
      app
      class="custom flex-column">
      <div class="social-container">
        <div class="social facebook">
          <a
            href="https://www.facebook.com/jimmiejacksonphotography/"
            target="_blank">
            <icon
              name="facebook-f"
              fill="grey"
              height="30px"
              width="30px" />
          </a>
        </div>
        <div class="social instagram">
          <a
            href="https://www.instagram.com/jimmie_photo/"
            target="_blank">
            <icon
              name="instagram-alt"
              fill="grey"
              height="30px"
              width="30px" />
          </a>
        </div>
        <div class="social email">
          <a
            href="mailto:howdy@jimmiejacksonphotography.com"
            target="_blank">
            <icon
              name="envelope-alt"
              fill="grey"
              height="30px"
              width="30px" />
          </a>
        </div>
      </div>
      <span
        class="subtitle-2 grey--text text--darken-3">&copy; {{ new Date().getFullYear() }} Jimmie Jackson Photography</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data: () => ({
      drawer: null,
      items: [
        {title: 'Portfolio', to: '/portfolio', badge: false},
        {title: 'About', to: '/about', badge: false},
        {title: 'Contact', to: '/contact', badge: false},
        {title: 'Cart', to: '/cart', badge: true}
      ]
    }),

    computed: {
      ...mapGetters('cart', ['cartItems']),
      hasCartItems() {
        return this.cartItems > 0;
      },
    },

    methods: {
      delay(t) {
        return new Promise(resolve => setTimeout(resolve, t));
      }
    },

    watch: {
      cartItems: function(newValue, oldValue) {
        const badge = document.querySelector('.v-badge__badge');
        if (newValue !== oldValue) {
          badge.classList.add('bounce');
          this.delay(500).then(() => {
            badge.classList.remove('bounce');
          });
        }
      }
    },

    components: {
      HomeDrawer: () => import('~/components/Drawer'),
    }
  }
</script>

<style lang="scss" scoped>
  main.v-content {
    padding: 100px 0 !important;
  }
  footer.v-footer.custom {
    background-color: transparent;
    color: white;
    display: flex;
    justify-content: center;
    padding: 2rem;
    position: relative;

    .social-container {
      display: grid;
      justify-content: center;
      grid-gap: 2rem;
      grid-template-columns: repeat(3, auto);
      margin-bottom: 1rem;

      .social {
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        height: 46px;
        justify-content: center;
        line-height: 1 !important;
        width: 46px;

        &.facebook {
          transition: 0.2s background-color ease-in-out;

          &:hover {
            background-color: #3b5998;
          }
        }

        &.instagram {
          transition: 0.2s background-color ease-in-out;

          &:hover {
            background-color: #fbad50;
          }
        }

        &.email {
          transition: 0.2s background-color ease-in-out;

          &:hover {
            background-color: #21860c;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  @import '~/css/breakpoints.scss';

  .social { // can't be scoped
    &:hover {
      svg {
        fill: white;
      }
    }
  }

  #home-app-bar {
    background-color: #fff;

    .logo {
      max-width: 200px;

      @include breakpoint(desktop) {
        max-width: 300px;
      }
    }

    .right-menu-wrapper {
      align-items: center;

      .v-tabs-slider {
        max-width: 50%;
        margin: 0 auto;
      }

      .v-tab {
        &:before {
          display: none;
        }
      }

      .nav-link {
        color: rgba(0, 0, 0, 0.54);
        font-size: 1rem;
        letter-spacing: 2px;
      }
    }
  }

  .default-badge {
    .v-badge__badge {
      bottom: calc(100% - 5px) !important;
      left: 100% !important;
    }
  }



  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 0.2s ease;
  }

  .fade-leave-active {
    transition: opacity 0.2s ease;
    opacity: 0;
  }

  @mixin ballb($yaxis: 0) {
    transform: translate3d(0, $yaxis, 0);
  }

  @keyframes bouncein {
    0%, 50% { @include ballb(-3px); }
    25%, 75%, 100% { @include ballb() }
  }

  .bounce {
    animation: bouncein 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

</style>