import Vue from 'vue';
import App from './App';
import MpvueRouterPatch from 'mpvue-router-patch';

Vue.config.productionTip = false;
Vue.use(MpvueRouterPatch);
App.mpType = 'app';

const app = new Vue(App);
app.$mount();
