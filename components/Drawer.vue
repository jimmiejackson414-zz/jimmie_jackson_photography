<template>
  <v-navigation-drawer
    bottom
    color="transparent"
    fixed
    height="auto"
    overlay-color="black"
    overlay-opacity=".1"
    temporary
    v-bind="$attrs"
    v-on="$listeners">
    <v-list
      color="white"
      shaped>
      <v-list-item>
        <v-text-field
          label="Search"
          outlined
          clearable
          color="primary"
          hide-details
          dense
          class="mb-3">
          <template v-slot:prepend>
            <unicon
              name="search"
              fill="gray"
              height="20px"
              width="20px" />
          </template>
        </v-text-field>
      </v-list-item>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        :exact="item.title === 'Home'"
        color="primary">
        <v-list-item-content>
          <v-list-item-title
            v-if="item.badge"
            class="reset-overflow">
            <v-badge
              color="red"
              :content="cartItems"
              :value="cartItems"
              class="inline-badge"
              overlap>
              {{ item.title }}
            </v-badge>
          </v-list-item-title>
          <v-list-item-title
            v-else
            v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'HomeDrawer',

    props: {
      items: {
        type: Array,
        default: () => ([]),
      },
    },

    computed: {
      cartItems() {
        return 2;
      }
    }
  }
</script>

<style lang="scss">
  .v-list-item__title {
    overflow: initial !important;

    > .v-badge.inline-badge {
      margin-top: 0;

      .v-badge__badge {
        bottom: calc(100% - 15px) !important;
        left: calc(100% + 1rem) !important;
      }
    }
  }

</style>