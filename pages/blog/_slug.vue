<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container class="pt-5">
    <page-title
      :text="articleTitle"
      :subtitle="publishDate"
      back-slug="/blog" />
    <v-row
      align="start"
      justify="center">
      <v-col
        cols="12"
        md="8">
        <span
          v-if="post"
          class="body-1 post-wrapper"
          v-html="$md.render(post.content)" />
        <mailchimp-form />
        <div class="fb-wrapper text-center">
          <client-only>
            <div id="fb-root" />
            <div
              class="fb-comments"
              :data-href="`https://www.jimmiejacksonphotography.com/blog/${postSlug}`"
              data-numposts="5"
              data-width="" />
          </client-only>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import dayjs from 'dayjs';
  import postQuery from '~/apollo/queries/blog/post';
  import PageTitle from '~/components/PageTitle';
  import MailchimpForm from '~/components/MailchimpForm';

  export default {
    name: 'BlogPost',

    apollo: {
      post: {
        prefetch: false,
        query: postQuery,
        variables() {
          return {
            slug: this.$route.params.slug,
          }
        }
      }
    },

    computed: {
      articleTitle() {
        return this.post ? this.post.title : '';
      },
      postSlug() {
        return this.post ? this.post.slug : '';
      },
      publishDate() {
        return this.post ? `Published ${dayjs(this.post.published_at).format('MMM DD, YYYY')}` : '';
      }
    },

    components: {
      MailchimpForm,
      PageTitle,
    },

    head() {
      return {
        title: this.post ? this.post.title : '',
        script: [
          { src: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0&appId=1426336677753774&autoLogAppEvents=1', async: true, defer: true, crossorigin: 'anonymous', nonce: 'tvz4i7de'}
        ]
      }
    }
  }
</script>

<style lang="scss">
  .post-wrapper {
    img {
      width: 100%;
    }
  }

  .fb-wrapper {
    margin-top: 4rem;
  }
</style>