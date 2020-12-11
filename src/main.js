import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import Home from './views/Home.vue';
import Users from './views/Users.vue';
import Bookings from './views/Bookings.vue';
import MyBookings from './views/MyBookings.vue';
import AllVehicles from './views/AllVehicles.vue';
import MyVehicles from './views/MyVehicles.vue';
import MyAccount from './views/MyAccount.vue';
import VueCookies from 'vue-cookies'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueCookies)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/users', name: 'users', component: Users },
  { path: '/bookings', name: 'bookings', component: Bookings },
  { path: '/mybookings', name: 'mybookings', component: MyBookings },
  { path: '/myvehicles', name: 'myvehicles', component: MyVehicles },
  { path: '/allvehicles', name: 'allvehicles', component: AllVehicles },
  { path: '/myaccount', name: 'myaccount', component: MyAccount }
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
