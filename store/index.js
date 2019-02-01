import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import tokenTypes from '../utils/tokenType';

Vue.use(Vuex);
const state = {
  initUrl: '',
	tokenTypes: [
		{
			type: tokenTypes.MBTokenType,
      storeKey: 'token',
      token: null,
      loginPagePath: '../login/login',
      jwtInfo: {},
		}
	],
  code: '',
	delegate: '',
	//#ifdef H5
	delegate: '',
	wxAppid: '',
	//#endif
  cardId: process.env.NODE_ENV === 'development' ? '' : '',
  isLock: false,
	requests: [],
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
});
