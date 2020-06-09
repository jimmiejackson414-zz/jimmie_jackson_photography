module.exports = {
  load: {
    after: ['parser', 'router', 'sentry'],
  },
  settings: {
    sentry: {
      enabled: true
    }
  }
};