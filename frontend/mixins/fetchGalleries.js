import galleriesQuery from '~/apollo/queries/gallery/galleries';

export default {
  apollo: {
    galleries: {
      prefetch: true,
      query: galleriesQuery,
    }
  }
}