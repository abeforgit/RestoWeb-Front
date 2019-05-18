import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

export function getRoute(url: string): string {
  const regex = /:\/\/[^\/]*(\/.*$)/;
  const matches = regex.exec(url);
  if (!matches || matches.length < 2) {
    throw new Error("Couldn't parse route");
  }
  return matches[1];
}

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
      path: '/restos/:id/menus',
      name: 'menus',
      component: () => import('./views/RestosMenus.vue'),
    },
    {
      path: '/menus/:id',
      name: 'menus_info',
      component: () => import('./views/MenusInfo.vue'),
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
