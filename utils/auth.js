import store from '../store';
import { getMBToken } from './service';
import { getTokenType, setToken } from './cookies';
import { fetchData } from './fetch.js';

//#ifdef H5
const urlPath = () => window.location.origin + window.location.pathname;
export const webCode = () => {
  const queryStr = window.location.search.replace('?', '');
  let query = queryStr.split('&').map(e => e.split('='));
  query = query.filter(e => e.length === 2 && e[0] !== 'code').map(e => `${e[0]}=${e[1]}`).join('&');
  const url = `${urlPath()}?${query}`;
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${store.state.wxAppid}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo#wechat_redirect`;
};
//#endif

//#ifdef MP-WEIXIN
export const mpCode = () => uni.getProvider({
	service: 'oauth',
	success: oauthRes => {
		uni.login({
			provider: oauthRes.provider[0],
			success: res => {
				store.commit('CODE_CHANGE', res.code);
				getToken(res.code, 'MBTokenType');
			},
		});
	},
});
//#endif

const getToken = (code, ty, isJump = true) => {
	const tokenObj = getTokenType(ty);
	getMBToken({
		data: {
			code,
		},
		success: res => {
			console.log(res);
			if (res.data.token) {
				setToken(res.data.token, tokenObj);
				store.commit('MBTOKEN_CHANGE', res.data.token);
				store.state.requests.forEach(conf => fetchData(conf));
			}
			store.state.requests = [];
		},
		complete: () => {
			uni.hideLoading();
			store.state.isLock = false;
			store.commit('CODE_CHANGE', '');
		}
	});
}

export const wxLogin = () => {
	const code = store.state.code;
	if(!code) {
		//#ifdef H5
		webCode();
		//#endif
		
		//#ifdef MP-WEIXIN
		mpCode();
		//#endif
	}
	
	//#ifdef H5
	getToken(code, 'MBTokenType');
	//#endif
};