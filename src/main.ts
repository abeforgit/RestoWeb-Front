import 'reflect-metadata';
import './main.scss';

import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store/store';

import StarRating from 'vue-star-rating';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

Vue.component('star-rating', StarRating);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
