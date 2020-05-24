<template>
  <v-content
    v-if="!loading"
    class="background"
    :style="{
      backgroundImage:
        'url(' + require(`~/static/backgrounds/${randBackground.src}`) + ')'
    }">
    <div class="link-container">
      <div class="nav-link first">
        <nuxt-link
          to="/portfolio"
          :class="['display-4', randBackground.color]">
          Portfolio
        </nuxt-link>
      </div>
      <div class="nav-link second">
        <nuxt-link
          to="/about"
          :class="['display-4', randBackground.color]">
          About
        </nuxt-link>
      </div>
      <div class="nav-link third">
        <nuxt-link
          to="/contact"
          :class="['display-4', randBackground.color]">
          Contact
        </nuxt-link>
      </div>
    </div>
  </v-content>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';

  export default {
    layout: 'homepage',
    computed: {
      ...mapState({
        randBackground: state => state.homepage.background,
        loading: state => state.homepage.loading,
      }),
    },

    methods: {
      ...mapMutations({
        generateBackground: 'homepage/generateBackground',
      })
    },
    mounted() {
      this.generateBackground();
    },
    head() {
      return {
        title: 'Home | Jimmie Jackson Photography',
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '~/css/breakpoints.scss';

  main.background {
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    display: flex;
    flex-flow: row wrap;
    height: 100%;
    padding: 64px 0 100px !important;

    .link-container {
      align-items: center;
      display: grid;
      grid-template-columns: 1fr;
      height: 100%;
      justify-content: space-around;
      margin: 0 auto;
      text-align: center;
      width:75%;

      @include breakpoint(desktop) {
        grid-template-columns: repeat(3, auto);
      }

      .nav-link {
        position: relative;

        &:after {
          border-radius: 2px;
          content: '';
          height: 5px;
          left: 50%;
          margin-top: 2rem;
          position: absolute;
          transform: translateX(-50%);
          transition: width 0.4s;
          transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
          top: calc(100% - 10%);
          width: 0;
        }

        &:before {
          background-color: transparent !important;
        }

        &:hover,
        &:focus {
          outline: none;

          &:after {
            width: calc(100% - 40px);
          }

          &:before {
            background-color: transparent;
          }
        }

        &.first {
          &:after {
            background: var(--v-primary-base);
          }
        }
        &.second {
          &:after {
            background: var(--v-secondary-base);
          }
        }
        &.third {
          &:after {
            background: var(--v-success-base);
          }
        }

        a {
          font-family: 'Open Sans' !important;
        }
      }
    }
  }
</style>
