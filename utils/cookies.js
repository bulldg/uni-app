import store from '../store';
import base64 from './base64';

const getTokenType = k => {
	if(typeof k !== 'string') {
		return k;
	}
	return store.state.tokenTypes.filter(t => t.type === k)[0];
};

const setToken = (t, ty, refresh = true) => {
	ty = getTokenType(ty);
	if (!ty) {
		return;
	}
	ty.token = t;
	if (refresh) {
		//#ifdef MP-WEIXIN || APP-PLUS
		return uni.setStorageSync(ty.storeKey, t);
		//#endif
		
		//#ifdef H5
		var d = new Date();
		d.setTime(d.getTime() + t * 24 * 60 * 60 * 1000);
		var expires = "expires=" + d.toUTCString();
		document.cookie = ty.storeKey + "=" + t + "; " + expires;
		//#endif
	}
	if (t) {
		const i = t.split(".")[1];
		const obj= JSON.parse(base64.decode(i));
		ty.jwtInfo = obj;
	} else {
		store.state.tokenTypes[0].jwtInfo = {
			account: null,
		};
	}
};

export {
	setToken,
	getTokenType,
}