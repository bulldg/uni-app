
import { fetchData, fetchMB } from './fetch.js';

const dev = '';

const getMBToken = config => fetchData({ url: `${dev}mc/v1/member_center/quick/wechat`, method: 'POST', ...config });
const sendCaptcha = config => fetchData({ url: `${dev}mc/v1/member_center/captcha`, method: 'POST', ...config });
const login = config => fetchData({ url: `${dev}mc/v1/member_center/login`, method: 'POST', ...config });
const getMemberInfo = config => fetchMB({ url: `${dev}mc/v1/member_center/info`, method: 'GET', ...config});

export {
	getMBToken,
  sendCaptcha,
	login,
	getMemberInfo,
};
