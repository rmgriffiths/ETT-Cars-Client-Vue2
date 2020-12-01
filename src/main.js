import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Home from './views/Home.vue';
import Users from './views/Users.vue';
import Vehicles from './views/Vehicles.vue';

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/users', name: 'users', component: Users },
  { path: '/vehicles', name: 'vehicles', component: Vehicles }
];

const router = new VueRouter ({
  routes,
  mode: 'history'
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
