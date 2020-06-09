const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  query: `
    galleryBySlug(id:ID slug:String): Gallery,
  `,
  resolver: {
    Query: {
      galleryBySlug: {
        resolverOf: 'Gallery.findOne',
        async resolver(_, { slug }) {
          const entity = await strapi.services.gallery.findOne({ slug });
          return sanitizeEntity(entity, { model: strapi.models.gallery });
        },
      },
    }
  }
}