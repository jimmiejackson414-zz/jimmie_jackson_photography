import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.STRAPI_BACKEND_BASE,
});

const dynamicRoutes = async () => {
  console.log('******** DYNAMIC ROUTES');

  // fetch galleries slugs
  const resForGalleries = await instance.get('/galleries');
  console.log('resForGalleries: ', resForGalleries.data);

  // fetch images slugs
  const resForImages = await instance.get('/images');
  console.log('resForImages: ', resForImages.data);

  const routesForGalleries = resForGalleries.data.map(gallery => {
    return {
      route: `/galleries/${gallery.slug}`,
      payload: gallery,
    };
  });
  console.log('routesForGalleries: ', routesForGalleries);

  const routesForImages = resForImages.data.map(image => {
    return {
      route: `/images/${image.slug}`,
      payload: image,
    };
  });
  console.log('routesForImages: ', routesForImages);

  return [...routesForGalleries, ...routesForImages];
};

export default dynamicRoutes;