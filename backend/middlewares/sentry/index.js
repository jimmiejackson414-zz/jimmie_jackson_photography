const Sentry = require('@sentry/node');
require('dotenv').config();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: strapi.config.environment,
});

module.exports = strapi => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        try {
          await next();
        } catch (error) {
          console.log('error: ', error);
          Sentry.captureException(error);
          throw error;
        }
      })
    }
  }
}