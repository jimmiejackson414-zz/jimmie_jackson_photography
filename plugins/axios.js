export default ({ $axios, env }) => {
  $axios.onRequest(config => {
    config.headers.common['Authorization'] = `Basic ${Buffer.from(env.WP_USERNAME + ':' + env.WP_PASSWORD).toString('base64')}`;
  });
}
