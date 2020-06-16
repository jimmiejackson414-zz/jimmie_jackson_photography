<template>
  <v-app>
    <v-container :style="{ paddingTop: '10rem' }">
      <v-row
        align="start"
        justify="center">
        <v-col
          class="text-center"
          cols="12">
          <h1
            v-if="error.statusCode === 404"
            class="display-4">
            {{ pageNotFound }}
          </h1>
          <h1
            v-else
            class="display-4">
            {{ otherError }}
          </h1>
          <p class="body-1 mb-0">
            Uh oh, something happened.
          </p>
          <p class="body-1 mb-0">
            Email me using the links at the bottom, or go back to the
            <NuxtLink to="/">
              Home Page
            </NuxtLink>
          </p>
        </v-col>
      </v-row>
    </v-container>
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
  export default {
    layout: 'empty',
    props: {
      error: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        pageNotFound: '404 Not Found',
        otherError: 'An error occurred'
      }
    },
    head() {
      const title =
        this.error.statusCode === 404 ? this.pageNotFound : this.otherError
      return {
        title
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 20px;
  }
</style>
