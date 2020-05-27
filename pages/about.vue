<template>
  <v-container class="pt-5">
    <page-title text="About Me" />
    <v-row
      align="center"
      justify="center">
      <v-col
        sm="12"
        md="6"
        lg="4">
        <v-img
          src="/about-me.jpg"
          max-width="800px" />
      </v-col>
      <v-col
        sm="12"
        md="6"
        lg="8">
        <p class="display-1 font-weight-bold">
          My first camera was an iPhone.
        </p>
        <p class="body-1">
          I know, I wish I had a cool story about how I used an old film camera as a kid, and knew that I wanted to be a photographer since I was born.
        </p>
        <p class="body-1">
          The truth is, that idea only really came about while I was hiking the 2,200 mile long Appalachian Trail in 2012. I carried a video camera the whole way to document my trip, but found myself taking hundreds of awesome photos as well.
        </p>
        <p class="body-1">
          Over the years I've taken photos all around the world and hiked approximately 3,000 miles of long-distance trails, always with a camera in tow. These days I live in Seattle, Washington, and get to see some of the coolest landscapes that the world has to offer.
        </p>
        <p class="body-1">
          I want to take pictures like Ansel Adams and Chris Burkard. I want to see new things. I want to meet new people and tell stories. Photography is something you can never master, only learn more of. And I am constantly learning.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import PageTitle from '~/components/PageTitle';

  export default {
    components: {
      PageTitle,
    }
  }
</script>

<style lang="scss" scoped>

</style>