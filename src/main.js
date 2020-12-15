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
import VerifiedAccount from './views/VerifiedAccount.vue';
import PageNotFound from './views/PageNotFound.vue';
import VueCookies from 'vue-cookies'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from 'firebase';

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueCookies)

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCDAzWZ649NeJSC9WdNTyJ_xeQdhyPzkQI",
  authDomain: "ettcars.firebaseapp.com",
  projectId: "ettcars",
  storageBucket: "ettcars.appspot.com",
  messagingSenderId: "1001647829958",
  appId: "1:1001647829958:web:40b81e2ec8e407a79f38c7",
  measurementId: "G-BR7FYBEG63"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/users', name: 'users', component: Users },
  { path: '/bookings', name: 'bookings', component: Bookings },
  { path: '/mybookings', name: 'mybookings', component: MyBookings },
  { path: '/myvehicles', name: 'myvehicles', component: MyVehicles },
  { path: '/allvehicles', name: 'allvehicles', component: AllVehicles },
  { path: '/myaccount', name: 'myaccount', component: MyAccount },
  { path: '/verifyaccount', name: 'VerifiedAccount', component: VerifiedAccount },
  { path: '*', name: 'PageNotFound', component: PageNotFound }
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
