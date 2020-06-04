import Vue from 'vue';
import Unicon from 'vue-unicons';
import {
  uniAngleLeft,
  uniAngleRight,
  uniCheckCircle,
  uniEnvelopeAlt,
  uniExpandArrowsAlt,
  uniFacebookF,
  uniInstagramAlt,
  uniMultiply,
  uniSearch
} from 'vue-unicons/src/icons';

Unicon.add([uniAngleLeft, uniAngleRight, uniCheckCircle, uniEnvelopeAlt, uniExpandArrowsAlt, uniFacebookF, uniInstagramAlt, uniMultiply, uniSearch]);
Vue.use(Unicon);