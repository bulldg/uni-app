import Vue from 'vue';
import App from './App';
import store from './store';

Vue.prototype.$store = store;
Vue.config.productionTip = false;

App.mpType = 'app';

//#ifdef H5
const getURLParameter = name => decodeURIComponent((new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(location.href) || [undefined, ''])[1].replace(/\+/g, '%20')) || null;
const code = getURLParameter('code');
store.commit('CODE_CHANGE', code);
//#endif

const app = new Vue({
	...App
});
app.$mount();
