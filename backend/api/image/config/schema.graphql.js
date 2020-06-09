const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  query: `
    imageBySlug(id: ID slug: String): Image
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
    },
  },
};