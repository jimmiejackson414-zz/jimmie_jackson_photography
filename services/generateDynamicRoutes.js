import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.WP_API_URL,
  headers: { 'Authorization': `Basic ${Buffer.from(process.env.WP_USERNAME + ':' + process.env.WP_PASSWORD).toString('base64')}`},
});

export const dynamicRoutes = async () => {

  // fetch galleries slugs
  const resForGalleries = await instance.get('/realmedialibrary/v1/tree');

  // fetch images slugs
  const resForImages = await instance.get('/wp/v2/media');

  const routesForGalleries = resForGalleries.data.tree.map(gallery => {
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