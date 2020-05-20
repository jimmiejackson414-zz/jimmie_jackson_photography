<template>
  <v-content
    class="background"
    :style="{
      backgroundImage:
        'url(' + require(`~/static/backgrounds/snow_mountain.jpg`) + ')'
    }">
    <div class="link-container">
      <div class="nav-link first">
        <nuxt-link
          to="/portfolio"
          class="display-3 grey--text text--darken-3">
          Portfolio
        </nuxt-link>
      </div>
      <div class="nav-link second">
        <nuxt-link
          to="/about"
          class="display-3 grey--text text--darken-3">
          About
        </nuxt-link>
      </div>
      <div class="nav-link third">
        <nuxt-link
          to="/contact"
          class="display-3 grey--text text--darken-3">
          Contact
        </nuxt-link>
      </div>
    </div>
  </v-content>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .background {
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    display: flex;
    flex-flow: row wrap;
    height: 100%;

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
      }
    }
  }
</style>
