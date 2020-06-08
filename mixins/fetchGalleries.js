import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      galleries: state => state.portfolio.galleries,
    })
  },

  methods: {
    ...mapActions('portfolio', ['fetchGalleries']),
  },

  async fetch() {
    if (this.galleries.length) return;
    await this.fetchGalleries();
  }
}