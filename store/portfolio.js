export const state = () => ({
  galleries: [],
});

export const actions = {
  async fetchGalleries({ commit }) {
    let res = await this.$axios.$get(`${process.env.WP_API_URL}/wp/v2/media`);
    const data = Object.values(res.reduce((carry, item) => ({
      ...carry,
      [item.acf.category.slug]: (carry[item.acf.category.slug] || []).concat(item)
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
        if (image.acf.category.slug === slug) return selectedGallery = gallery;
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
        if (image.acf.category.slug === currentImage.acf.category.slug) return selectedGallery = gallery;
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
        if (image.acf.category.slug === slug) return selectedGallery = gallery;
      })
    })

    const currentGalleryIndex = state.galleries.indexOf(selectedGallery);

    // if a next gallery exists
    if (state.galleries[currentGalleryIndex + 1]) {
      steps['next'] = `/galleries/${state.galleries[currentGalleryIndex + 1][0].acf.category.slug}`;
    }

    // if a previous gallery exists
    if (state.galleries[currentGalleryIndex - 1]) {
      steps['previous'] = `/galleries/${state.galleries[currentGalleryIndex - 1][0].acf.category.slug}`;
    }

    return steps;
  },
};