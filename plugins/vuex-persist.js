import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'cartItems',
      storage: window.localStorage,
      modules: ['cart'],
    }).plugin(store);

    new VuexPersistence({
      key: 'search',
      storage: window.localStorage,
      modules: ['search'],
    }).plugin(store);
  })
}