import md5 from './md5';
import store from '../store';
import { wxLogin } from './auth';
import { getTokenType } from './cookies';

const url = 'https://dev.10010sh.cn/';

const cleanParams = (p = {}) => {
	Object.keys(p).forEach(k => {
		if (p[k] === undefined || p[k] === null) {
			delete p[k];
		}
	});
};

const sign = config => {
}

const fetch = config => {
	const originConfig = {...config};
	if (!config.url) {
    return;
  }
	
	config.header = config.header || {};
  config.data = config.data || {};
  config.data.delegate_code = store.state.delegate;
  config.isJump = config.isJump || true;
  delete config.isJump;
	
	if (config.tokenType) {
    if (config.tokenType.token) {
      config.header.Authorization = 'Bearer ' + config.tokenType.token;
    } else {
      store.state.requests.push(originConfig);
      wxLogin();
      return;
    }
  }
	config.method = config.method || 'GET';
  if (config.method === 'DELETE') {
    config.data = {};
  }  
	
	if (!config.header['content-type']) {
		config.header['content-type'] = 'application/x-www-form-urlencoded';
	}

	const success = config.success;
	const fail = config.fail;
	config.success = res => {
		if (res.statusCode > 299 || res.statusCode < 200) {
			if (!res.data) {
				fail({});
				return;
			}
			if (res.statusCode === 401) {
				store.state.requests.push(originConfig);
				return;
			}
			const err = {
				errorCode: res.data.errorCode,
				errorMsg: res.data.displayedMsg || '找不到请求资源',
				timestamp: res.data.timestamp,
				statusCode: res.statusCode,
			}
			fail(err);
		} else {
			success(res);
		}
	}
	cleanParams(config.data);
	sign(config);
	config.url = `${url}${config.url}`;
	return uni.request(config);
};

const fetchData = (config, tyKey) => {
  if (tyKey) {
    config.tokenType = getTokenType(tyKey);
  }
  fetch(config);
};

const fetchMB = config => {
  return fetchData(config, 'MBTokenType');
};

export {
	fetchData,
	fetchMB,
};
