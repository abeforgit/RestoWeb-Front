import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import isMockFunction = jest.isMockFunction;

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/restos',
      name: 'restos',
      component: () => import('./views/Restos.vue'),
    },
    {
      path: '/restos/:id',
      name: 'restos_info',
      component: () => import('./views/RestosInfo.vue'),
    },
    {
      path: '/menus',
      name: 'menus',
      component: () => import('./views/Menus.vue'),
    },
    {
      path: '/dishes',
      name: 'dishes',
      component: () => import('./views/Dishes.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/SignUp.vue'),
    },
    {
      path: '/*',
      component: () => import('./views/NotFound.vue'),
    },
  ],
});
