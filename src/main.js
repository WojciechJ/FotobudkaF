/* eslint-disable linebreak-style */
import Vue from 'vue';
import VueAxios from 'vue-axios';
import './css/bootstrap.min.css';
import './css/fancybox.min.css';
import './css/style.scss';
import './css/aos.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import vuejquery from 'vue-jquery';
import AOS from 'aos';
import axios from 'axios';
import store from './store';
import router from './router';
import App from './App.vue';
import gsap from "gsap";
import CSSPlugin from "gsap/CSSPlugin";
import './registerServiceWorker'


library.add(fab);
library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(vuejquery);
Vue.use(VueAxios, axios);
AOS.init();
gsap.registerPlugin(CSSPlugin);
const token = localStorage.getItem('user-token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
}

Vue.config.productionTip = false;
Vue.directive('touppercase', {
  update(el) {
    // eslint-disable-next-line no-param-reassign
    el.value = el.value.toUpperCase();
  },
});
new Vue({
  data() {
    return {
      photos: [],
      term: '',
      itemsPerRow: 5,
      isLoading: false,
    };
  },
  router,
  store,
  gsap,
  CSSPlugin,
  render: h => h(App),
}).$mount('#app');
