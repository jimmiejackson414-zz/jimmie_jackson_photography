export const state = () => ({
  query: '',
});

export const actions = {
  async setQuery({ commit }, query) {
    await commit('setQuery', query);
  }
};

export const mutations = {
  setQuery(state, query) {
    state.query = query;
  },
}