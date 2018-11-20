import Vue from 'vue';
import App from './App';
import MpvueRouterPatch from 'mpvue-router-patch';
// import store from './stores';
// const Fly = require('flyio/dist/npm/wx')
// const fly = new Fly();

Vue.use(MpvueRouterPatch);
// Vue.prototype.$store = store;
// Vue.prototype.$fly = fly;
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
