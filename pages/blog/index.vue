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
          <p class="subtitle-1 font-italic">
            Published {{ publishDate(post.published_at) }}
          </p>
          <p class="body-1">
            {{ truncateContent(post.content ) }}
            <nuxt-link
              :to="`/blog/${post.slug}`"
              class="read-more">
              Read More
            </nuxt-link>
          </p>
        </div>
        <v-row
          align="center"
          justify="center">
          <v-col
            cols="12"
            align="center"
            justify="center">
            <v-btn
              v-if="morePosts"
              color="primary"
              class="my-5"
              :ripple="false"
              outlined
              depressed
              :disabled="loadingMorePosts"
              @click="fetchMorePosts">
              <spinner v-if="loadingMorePosts" />
              <span v-else>Show More</span>
            </v-btn>
          </v-col>
        </v-row>

        <mailchimp-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import dayjs from 'dayjs';
  import postsQuery from '~/apollo/queries/blog/posts';
  import PageTitle from '~/components/PageTitle';
  import Spinner from '~/components/Spinner';
  import { truncate } from '~/helpers/functions';
  import MailchimpForm from '~/components/MailchimpForm';

  const pageSize = 5;

  export default {
    name: 'BlogIndex',

    data: () => ({
      loadingMorePosts: false,
      page: 0,
      pageSize,
    }),

    apollo: {
      postsCount: {
        prefetch: true,
        query: postsQuery,
        variables: {
          page: 0,
          pageSize,
        }
      },
      posts: {
        prefetch: true,
        query: postsQuery,
        variables: {
          page: 0,
          pageSize,
        }
      },
    },

    computed: {
      morePosts() {
        return this.posts.length < this.postsCount.aggregate.totalCount;
      }
    },

    methods: {
      async fetchMorePosts() {
        this.loadingMorePosts = true;
        this.page += this.pageSize;

        this.$apollo.queries.posts.fetchMore({
          variables: {
            page: this.page,
            pageSize,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newPosts = fetchMoreResult.posts;
            if (!newPosts.length) return previousResult;

            return {
              posts: [...previousResult.posts, ...newPosts],
              postsCount: fetchMoreResult.postsCount,
            }
          }
        });

        this.loadingMorePosts = false;
      },
      publishDate(date) {
        return dayjs(date).format('MMM DD, YYYY');
      },
      truncateContent(content) {
        return truncate(content);
      }
    },

    components: {
      MailchimpForm,
      PageTitle,
      Spinner,
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

  .v-application.theme--dark {
    .post-wrapper {
      .post-title {
        color: #fff;

        &:hover {
          color: $primary;
        }
      }
    }
  }
</style>

