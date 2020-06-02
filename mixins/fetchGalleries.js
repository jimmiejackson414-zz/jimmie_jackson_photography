import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      galleries: state => state.portfolio.galleries[0],
    })
  },

  methods: {
    ...mapActions('portfolio', ['fetchGalleries']),
  },

  async fetch() {
    await this.fetchGalleries();
  }
}