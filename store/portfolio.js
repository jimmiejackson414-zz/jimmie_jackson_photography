export const state = () => ({
  galleries: [],
});

export const actions = {
  async fetchGalleries({ commit }) {
    let res = await this.$axios.$get(`${process.env.WP_API_URL}/wc/v3/products?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`);
    const data = Object.values(res.reduce((carry, item) => ({
      ...carry,
      [item.categories[0].slug]: (carry[item.categories[0].slug] || []).concat(item),
    }), {}));

    commit('setGalleries', data);
  }
};

export const mutations = {
  setGalleries(state, data) {
    state.galleries = data;
  }
};

export const getters = {
  fetchGallery: state => slug => {
    let selectedGallery;
    state.galleries.forEach(gallery => {
      gallery.forEach(image => {
        if (image.categories[0].slug === slug) return selectedGallery = gallery;
      })
    })
    return selectedGallery;
  },
  fetchImage: state => slug => {
    let selectedImage;
    state.galleries.forEach(gallery => {
      gallery.forEach(image => {
        if (image.slug === slug) return selectedImage = image;
      })
    })
    return selectedImage;
  },
  fetchImageNavigationSlugs: state => currentImage => {
    let selectedGallery;
    let steps = { next: null, previous: null };

    state.galleries.forEach(gallery => {
      gallery.forEach(image => {
        if (image.categories[0].slug === currentImage.categories[0].slug) return selectedGallery = gallery;
      })
    })

    const currentImageIndex = selectedGallery.indexOf(currentImage);

    // if next image exists
    if (selectedGallery[currentImageIndex + 1]) {
      steps['next'] = `/images/${selectedGallery[currentImageIndex + 1].slug}`;
    }

    // if previous image exists
    if (selectedGallery[currentImageIndex - 1]) {
      steps['previous'] = `/images/${selectedGallery[currentImageIndex - 1].slug}`;
    }

    return steps;
  },
  fetchGalleryNavigationSlugs: state => slug => {
    let selectedGallery;
    let steps = { next: null, previous: null };
    state.galleries.forEach(gallery => {
      gallery.forEach(image => {
        if (image.categories[0].slug === slug) return selectedGallery = gallery;
      })
    })

    const currentGalleryIndex = state.galleries.indexOf(selectedGallery);

    // if a next gallery exists
    if (state.galleries[currentGalleryIndex + 1]) {
      steps['next'] = `/galleries/${state.galleries[currentGalleryIndex + 1][0].categories[0].slug}`;
    }

    // if a previous gallery exists
    if (state.galleries[currentGalleryIndex - 1]) {
      steps['previous'] = `/galleries/${state.galleries[currentGalleryIndex - 1][0].categories[0].slug}`;
    }

    return steps;
  },
};