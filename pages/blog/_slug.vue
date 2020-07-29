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
        title: ''
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
</style>