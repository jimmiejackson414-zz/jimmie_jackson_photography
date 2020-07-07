import Vue from 'vue';
import Cloudinary, { CldImage, CldTransformation } from 'cloudinary-vue';

Vue.use(Cloudinary, {
  configuration: { cloudName: process.env.CLOUDINARY_NAME },
  components: [ CldImage, CldTransformation ]
})