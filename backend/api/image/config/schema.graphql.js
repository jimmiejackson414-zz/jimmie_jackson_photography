const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  query: `
    imageBySlug(id: ID slug: String): Image
    searchImages(searchQuery: String): [Image]
  `,
  resolver: {
    Query: {
      imageBySlug: {
        resolverOf: 'Image.findOne',
        async resolver(_, { slug }) {
          const entity = await strapi.services.image.findOne({ slug });
          return sanitizeEntity(entity, { model: strapi.models.image });
        },
      },
      searchImages: {
        resolverOf: 'Image.find',
        async resolver(_, { searchQuery }) {
          if (searchQuery) {
            const params = {
              _q: searchQuery,
              name_contains: searchQuery,
              tags_contains: searchQuery,
              location_contains: searchQuery,
            }
            const searchResults = await strapi
              .query('image')
              .search(params)
            return searchResults;
          }
        }
      }
    },
  },
};