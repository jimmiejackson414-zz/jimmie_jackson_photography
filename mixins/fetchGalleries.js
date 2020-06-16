import galleriesQuery from '~/apollo/queries/gallery/galleries';

export default {
  apollo: {
    galleries: {
      query: galleriesQuery,
    }
  }
};