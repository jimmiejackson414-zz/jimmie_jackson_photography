export const state = () => ({
  items: [],
});

export const getters = {
  cartItems(state) {
    return state.items.length;
  },
};

export const mutations = {
  addToCart(state, item) {
    state.items.push(item);
  },
  removeFromCart(state, item) {
    state.items.splice(state.items.indexOf(item), 1);
  },
};