import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'cartItems',
      storage: window.localStorage,
      modules: ['cart'],
    }).plugin(store);
  })
}