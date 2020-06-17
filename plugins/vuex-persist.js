import VuexPersistence from 'vuex-persist';
import Cookies from 'js-cookie';

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'cartItems',
      restoreState: (key) => Cookies.getJSON(key),
      saveState: (key, state) => {
        Cookies.set(key, state, {
          expires: 30
        });
      },
      modules: ['cart']
    }).plugin(store);

    new VuexPersistence({
      key: 'search',
      storage: window.localStorage,
      modules: ['search'],
    }).plugin(store);
  })
}