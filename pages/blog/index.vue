<template>
  <v-container class="pt-5">
    <page-title text="Blog" />
    <v-row
      align="start"
      justify="center">
      <v-col
        cols="12"
        md="8">
        <div
          v-for="post in posts"
          :key="post.id"
          class="post-wrapper">
          <nuxt-link
            :to="`/blog/${post.slug}`"
            class="display-2 post-title">
            {{ post.title }}
          </nuxt-link>
          <p class="body-1">
            {{ truncateContent(post.content ) }}
            <nuxt-link
              :to="`/blog/${post.slug}`"
              class="read-more">
              Read More
            </nuxt-link>
          </p>
        </div>
        <mailchimp-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import postsQuery from '~/apollo/queries/blog/posts';
  import PageTitle from '~/components/PageTitle';
  import { truncate } from '~/helpers/functions';
  import MailchimpForm from '~/components/MailchimpForm';

  export default {
    name: 'BlogIndex',

    apollo: {
      posts: {
        prefetch: true,
        query: postsQuery,
      }
    },

    methods: {
      truncateContent(content) {
        return truncate(content);
      }
    },

    components: {
      PageTitle,
      MailchimpForm,
    },

    head() {
      return {
        title: 'Blog',
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/css/global';

  .post-wrapper {
    border-bottom: 1px solid $light-grey;
    padding: 3rem 0 1.5rem;

    .post-title {
      color: $dark-grey;
      transition: 0.2s color ease-in-out;

      &:hover {
        color: $primary;
      }
    }
  }
</style>

