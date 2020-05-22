<template>
  <v-app light>
    <v-app-bar
      id="home-app-bar"
      absolute
      elevate-on-scroll
      flat
      color="white"
      app>
      <v-toolbar-title>
        <nuxt-link to="/">
          <v-img
            src="/JJ_Logos_Black50_V2.png"
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
          <unicon
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
      :items="items" />
    <v-content fluid>
      <nuxt />
    </v-content>
    <v-footer
      app
      tile
      class="custom flex-column">
      <div class="social-container">
        <div class="social facebook">
          <a
            href="https://www.facebook.com/jimmiejacksonphotography/"
            target="_blank">
            <unicon
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
            <unicon
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
            <unicon
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

    components: {
      HomeDrawer: () => import('~/components/Drawer'),
    },
  }
</script>

<style lang="scss">
  @import '~/css/breakpoints.scss';

  #home-app-bar {
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
      }
    }
  }

  .default-badge {
    .v-badge__badge {
      bottom: calc(100% - 5px) !important;
      left: 100% !important;
    }
  }

  footer.v-footer.custom {
    background-color: transparent;
    color: white;
    display: flex;
    justify-content: center;
    padding: 2rem;

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

            svg {
              fill: white;
            }
          }
        }

        &.instagram {
          transition: 0.2s background-color ease-in-out;

          &:hover {
            background-color: #fbad50;

            svg {
              fill: white;
            }
          }
        }

        &.email {
          transition: 0.2s background-color ease-in-out;

          &:hover {
            background-color: #21860c;

            svg {
              fill: white;
            }
          }
        }
      }
    }
  }

</style>