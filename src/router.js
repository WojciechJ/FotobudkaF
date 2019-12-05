/* eslint-disable linebreak-style */
import Vue from 'vue';
import Router from 'vue-router';
// eslint-disable-next-line import/extensions
import store from './store.js';
import Home from './components/Home.vue';
import Code from './components/Code.vue';
import Login from './components/Login.vue';
import Profile from './components/Profile.vue';
import Register from './components/Register.vue';
import Pricing from './components/Pricing.vue';
import Contact from './components/Contact.vue';
import SecureComponent from "./components/secure.vue"
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/cennik',
      name: 'pricing',
      component: Pricing,
    },
    {
      path: '/kontakt',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/logowanie',
      name: 'login',
      component: Login,
    },
    {
      path: '/rejestracja',
      name: 'register',
      component: Register,
    },
    {
      path: "/secure",
      name: "secure",
      component: SecureComponent
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/',
      name: 'code',
      component: Code,

    },
  ],
});

router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
