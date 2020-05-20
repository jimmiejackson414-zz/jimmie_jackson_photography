<template>
  <v-app
    light>
    <v-app-bar
      absolute
      flat
      app
      class="transparent">
      <v-toolbar-title>
        <router-link to="/">
          <v-img
            src="/JJ_Logos_Black50_V2.png"
            max-width="300" />
        </router-link>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-content :style="{ paddingTop: 0 }">
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
      dark
      :fixed="false"
      app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
    }),
    computed: {
      isHomepage() {
        return this.$route.name === 'index'
      }
    },
  }
</script>

<style lang="scss">
  .container.container--fluid {
    height: 100%;
    padding: 0;
  }

  header.v-toolbar.transparent {
    background-color: transparent;
  }
</style>
