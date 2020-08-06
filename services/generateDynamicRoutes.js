import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.STRAPI_BACKEND_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});


const dynamicRoutes = async () => {

  // fetch galleries slugs
  const resForGalleries = await instance.get('/galleries');

  // fetch images slugs
  const resForImages = await instance.get('/images');

  // fetch blog posts
  const resForPosts = await instance.get('/posts');
  console.log('resForPosts: ', resForPosts);

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

  const routesForPosts = resForPosts.data.map(post => {
    return {
      route: `/blog/${post.slug}`,
      payload: post,
    };
  });
  console.log('routesForPosts: ', [...routesForPosts]);

  return [...routesForGalleries, ...routesForImages, ...routesForPosts];
};

export default dynamicRoutes;