<template>
  <div>
    <div
      class="row page-title-wrapper mx-0"
      :style="{marginBottom: marginStyles}">
      <v-btn
        v-if="backSlug"
        text
        :ripple="false"
        nuxt
        class="back-wrapper"
        :to="backSlug">
        <icon
          name="angle-left"
          fill="#9e9e9e"
          height="20px"
          width="20px"
          class="d-flex" />
        <p class="body-1 grey--text">
          Back
        </p>
      </v-btn>
      <h1 class="display-3 text-center page-title">
        {{ text }}
      </h1>
    </div>
    <v-row
      v-if="downloadPage"
      align="start"
      justify="center">
      <v-col
        class="column"
        cols="12"
        md="8">
        <v-expansion-panels
          accordion
          flat>
          <v-expansion-panel>
            <v-expansion-panel-header hide-actions>
              <icon
                name="info-circle"
                fill="#4a4a4a"
                height="20px"
                width="20px" />
              <p class="body-1 mb-0">
                Need help?
              </p>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p class="body-1">
                To download your purchased images, click the "Click To Download" button to the right of the image preview. This will open a new tab or window. Next, just right click on the image, choose "Save Image As", and save the image to your computer. If you have any questions, feel free to
                <nuxt-link to="/contact">
                  contact me!
                </nuxt-link>
              </p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    props: {
      backSlug: {
        type: String,
        default: '',
      },
      downloadPage: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        default: 'Page'
      }
    },

    computed: {
      marginStyles() {
        return this.downloadPage ? 0 : '4rem';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/css/breakpoints';

  .page-title-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    /* margin-top: 4rem; */

    @include breakpoint(desktop) {
      flex-direction: row;
      margin-bottom: 4rem;
      margin-top:2rem;
    }

    .back-wrapper {
      align-items: center;
      display: flex;
      justify-content: flex-start;
      margin-bottom: 1rem;
      position: absolute;

      @include breakpoint(desktop) {
        margin-bottom: 0;
      }

      p {
        margin: 0;
      }
    }

    .back-wrapper, .empty {
      flex: 0;
    }

    .page-title {
      flex-grow: 1;
      font-family: 'Comfortaa', sans-serif !important;
      font-weight: 400;
    }
  }

  .v-expansion-panels {
    button.v-expansion-panel-header {
      justify-content: center;
      text-align: center;

      & > div, p {
        flex: 0 0 auto;
      }

      .unicon {
        margin-right: 1rem;
      }
    }

    .v-expansion-panel-content {
      text-align: center;
    }
  }
</style>