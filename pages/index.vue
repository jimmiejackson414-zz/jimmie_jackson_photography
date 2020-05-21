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
    <div class="social-container">
      <div class="social facebook">
        <a
          href="https://www.facebook.com/jimmiejacksonphotography/"
          target="_blank">
          <unicon
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
          <unicon
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
          <unicon
            name="envelope-alt"
            fill="white"
            height="30px"
            width="30px" />
        </a>
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
      grid-template-columns: repeat(3, auto);
      height: 100%;
      justify-content: space-around;
      margin: 0 auto;
      width:75%;

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
            background: #5EA788;
          }
        }
        &.second {
          &:after {
            background: #6279A2;
          }
        }
        &.third {
          &:after {
            background: #F4A889;
          }
        }

        a {
          font-family: 'Open Sans' !important;
        }
      }
    }

    .social-container {
      display: flex;
      justify-content: center;

      .social {
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        height: 46px;
        justify-content: center;
        line-height: 1 !important;
        margin: 0 2rem;
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
