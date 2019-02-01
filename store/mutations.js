import base64 from '../utils/base64';

const parseToken = t => {
  const i = t.split('.')[1];
	console.log(i);
  return JSON.parse(base64.decode(i));
};

export default {
  DELEGATE_CHANGE(state, val) {
    state.delegate = val;
  },
  FONTRATE_CHANGE(state, val) {
    state.fontRate = val;
  },
  MOBILE_CHANGE(state, val) {
    state.mobile = val;
  },
  CODE_CHANGE(state, val) {
    state.code = val;
  },
  INIT_URL_CHANGE(state, val) {
    state.initUrl = val;
  },
  LOCK_CHANGE(state, val) {
    state.lock = val;
  },
  MBTOKEN_CHANGE(state, val) {
    state.tokenTypes[0].token = val;
    const jwtinfo = val ? parseToken(val) : {};
    state.tokenTypes[0].jwtInfo = jwtinfo;
    state.delegate = jwtinfo.aud || '2010007';
  },
};
