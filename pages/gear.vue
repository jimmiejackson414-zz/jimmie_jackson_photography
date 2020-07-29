<template>
  <v-container class="pt-5">
    <page-title text="Gear" />
    <v-row
      align="start"
      justify="center">
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="6"
        class="text-center">
        <p class="body-1">
          Below you'll find a list of the gear I currently use split up by category.
        </p>
        <p class="subtitle">
          *Please be aware that these are affiliate links, and by purchasing products through these links I will be compensated by the affiliate provider at no additional cost to you. This helps me to continue doing what I love!
        </p>
      </v-col>
    </v-row>
    <v-row
      v-for="category in gears"
      :key="category.name"
      align="start"
      justify="center"
      class="mb-5">
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="6"
        class="text-center">
        <h3 class="category-title display-1">
          {{ category.name }}
        </h3>
        <ul class="items-list">
          <li
            v-for="item in category.gear_items"
            :key="item.name"
            class="item body-1">
            <a
              :href="formatUrl(item.url)"
              target="_blank"
              rel="noopener noreferrer">
              {{ item.name }}
            </a>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import PageTitle from '~/components/PageTitle';
  import gearsQuery from '~/apollo/queries/gear/gears';

  export default {
    name: 'Gear',

    apollo: {
      gears: {
        query: gearsQuery,
      }
    },

    methods: {
      formatUrl(url) {
        return !/^https?:\/\//i.test(url) ? `https://${url}` : url;
      }
    },

    components: {
      PageTitle,
    },

    head() {
      return {
        title: 'Gear'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .category-title {
    margin-bottom: 1rem;
  }

  .items-list {
    list-style: none;

    .item {
      margin-bottom: 1.5rem;
    }
  }
</style>