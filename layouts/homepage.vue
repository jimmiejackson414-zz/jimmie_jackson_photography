<template>
  <v-app
    light>
    <v-app-bar
      absolute
      flat
      app
      :class="['transparent', position]">
      <v-toolbar-title>
        <nuxt-link to="/">
          <v-img
            :src="randBackground.logo"
            max-width="300" />
        </nuxt-link>
      </v-toolbar-title>
    </v-app-bar>
    <v-content :style="{ padding: 0 }">
      <v-container
        v-if="isHomepage"
        fluid>
        <nuxt />
      </v-container>
      <v-container v-else>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      app
      tile
      fixed
      class="custom flex-column">
      <div class="social-container">
        <div class="social facebook">
          <a
            href="https://www.facebook.com/jimmiejacksonphotography/"
            target="_blank">
            <icon
              name="facebook-f"
              fill="white"
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
              fill="white"
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
              fill="white"
              height="30px"
              width="30px" />
          </a>
        </div>
      </div>
      <span class="subtitle-2">&copy; {{ new Date().getFullYear() }} Jimmie Jackson Photography</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data: () => ({
      logo: null,
    }),
    computed: {
      ...mapState({
        randBackground: state => state.homepage.background,
      }),
      isHomepage() {
        return this.$route.name === 'index'
      },
      position() {
        return this.randBackground.position;
      }
    },
  }
</script>

<style lang="scss">
  @import '~/css/breakpoints.scss';

  .container.container--fluid {
    height: 100%;
    padding: 0;
  }

  header.v-toolbar.transparent {
    background-color: transparent;
      &.left {
        .v-toolbar__content {
          justify-content: center;

          @include breakpoint(desktop) {
            justify-content: start;
          }
        }
      }

      &.right {
        .v-toolbar__content {
          justify-content: end;
        }
      }

      &.center {
        .v-toolbar__content {
          justify-content: center;
        }
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
