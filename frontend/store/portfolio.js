import axios from 'axios';

export const state = () => ({
  galleries: [],
});

export const actions = {
  async fetchGalleries({ commit }) {
    const { data } = await axios.get(`${process.env.STRAPI_BACKEND_URL}/galleries`);
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
    return state.galleries.find(gallery => gallery.slug === slug);
  },
  fetchImage: state => slug => {
    let foundImage;
    state.galleries.forEach(gallery => {
      gallery.images.find(image => {
        if (image.slug === slug) return foundImage = image;
      })
    });
    return foundImage;
  },
  fetchImageNavigationSlugs: state => currentImage => {
    let selectedGallery;
    let steps = { next: null, previous: null };

    state.galleries.forEach(gallery => {
      gallery.images.forEach(image => {
        if (image.slug === currentImage.slug) return selectedGallery = gallery;
      });
    });

    const currentImageIndex = selectedGallery.images.indexOf(currentImage);

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
  fetchGalleryNavigationSlugs: state => currentGallery => {
    let steps = { next: null, previous: null };
    const currentGalleryIndex = state.galleries.indexOf(currentGallery);

    // if a next gallery exists
    if (state.galleries[currentGalleryIndex + 1]) {
      steps['next'] = `/galleries/${state.galleries[currentGalleryIndex + 1]['slug']}`;
    }

    // if a previous gallery exists
    if (state.galleries[currentGalleryIndex - 1]) {
      steps['previous'] = `/galleries/${state.galleries[currentGalleryIndex - 1]['slug']}`;
    }

    return steps;
  },
};