export default {
  computed: {
    publicKey() {
      return process.env.IMAGEKIT_PUBLIC_KEY;
    },
    urlEndpoint() {
      return process.env.IMAGEKIT_URL_ENDPOINT;
    }
  }
};