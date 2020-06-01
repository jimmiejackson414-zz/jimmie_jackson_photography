export const state = () => ({
  galleries: [],
});

export const actions = {
  async fetchGalleries({ commit }) {
    let res = await this.$axios.$get(`${process.env.WP_API_URL}/wp/v2/media`);
    const data = res.reduce((images, item) => {
      const image = images[item.acf.category.slug] || [];
      image.push(item);
      images[item.acf.category.slug] = image;
      return images;
    }, {});

    commit('setGalleries', data);
  }
};

export const mutations = {
  setGalleries(state, data) {
    state.galleries.push(data);
  }
};

export const getters = {
  fetchGallery: state => slug =>  {
    return state.galleries[0][slug];
  },
  fetchImage: state => slug => {
    let image;
    for (let [, value] of Object.entries(state.galleries[0])) {
      value.forEach(v => {
        if (v.slug === slug) return image = v;
      })
    }
    return image;
  }
}