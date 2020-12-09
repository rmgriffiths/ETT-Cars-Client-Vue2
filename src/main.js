import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import Home from './views/Home.vue';
import Users from './views/Users.vue';
import MyVehicles from './views/MyVehicles.vue';
import AllVehicles from './views/AllVehicles.vue';
import Account from './views/Account.vue';
import VueCookies from 'vue-cookies'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueCookies)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/users', name: 'users', component: Users },
  { path: '/myvehicles', name: 'myvehicles', component: MyVehicles },
  { path: '/allvehicles', name: 'allvehicles', component: AllVehicles },
  { path: '/account', name: 'account', component: Account }
];

const router = new VueRouter ({
  routes,
  mode: 'history'
})

new Vue({
    vuetify,
    router,
    render: h => h(App)
    })
  .$mount('#app')
