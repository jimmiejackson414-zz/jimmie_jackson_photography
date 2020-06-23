import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.STRAPI_BACKEND_BASE,
});

const dynamicRoutes = async () => {

  // fetch galleries slugs
  const resForGalleries = await instance.get('/galleries');

  // fetch images slugs
  const resForImages = await instance.get('/images');

  const routesForGalleries = resForGalleries.data.map(gallery => {
    return {
      route: `/galleries/${gallery.slug}`,
      payload: gallery,
    };
  });

  const routesForImages = resForImages.data.map(image => {
    return {
      route: `/images/${image.slug}`,
      payload: image,
    };
  });

  // concatenate both route arrays
  const routes = routesForGalleries.concat(routesForImages);

  return routes;
};

export default dynamicRoutes;