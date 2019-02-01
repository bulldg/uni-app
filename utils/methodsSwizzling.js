
module.exports = (app) => {
    app.sdk.ucNavigateTo = config => {
      if (app.gd.pageLock) {
        return;
      }
      app.gd.pageLock = true;
      setTimeout(() => {
        app.gd.pageLock = false;
      }, 1000);
      app.sdk.navigateTo(config);      
	  };
	
	  app.sdk.ucRedirectTo = config => {
		if (app.gd.pageLock) {
		  return;
		}
		app.gd.pageLock = true;
		setTimeout(() => {
		  app.gd.pageLock = false;
		}, 1000);
		app.sdk.redirectTo(config);      
    };
		
		if (!Object.keys) {
      Object.keys = (function () {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length;

        return function (obj) {
          if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
            throw new TypeError('Object.keys called on non-object');
          }

          var result = [], prop, i;

          for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
              result.push(prop);
            }
          }

          if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
              if (hasOwnProperty.call(obj, dontEnums[i])) {
                result.push(dontEnums[i]);
              }
            }
          }
          return result;
        };
      }());
    }

    if (!Object.entries) {
      Object.entries = function (obj) {
        var ownProps = Object.keys(obj),
          i = ownProps.length,
          resArray = new Array(i); // preallocate the Array
        while (i--) {
          resArray[i] = [ownProps[i], obj[ownProps[i]]];
        }
        return resArray;
      };
    }

    if (!Array.prototype.includes) {
      Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {
          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          }

          var o = Object(this);
          var len = o.length >>> 0;
          if (len === 0) {
            return false;
          }
          var n = fromIndex | 0;
          var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
          while (k < len) {
            if (o[k] === searchElement) {
              return true;
            }
            k++;
          }
          return false;
        }
      });
    }

		return;
	
	  app.sdk.login = (config) => {
			app.sdk.getAuthCode({
				success: (res) => {
					config.success({code: res.authCode});
				},
				fail: config.fail,
			});
		}; 
	
		app.sdk.getUserInfo = (config) => {
			app.sdk.getAuthUserInfo({
				success: (res) => {
					res.avatarUrl = res.avatar;
					const userInfo = res;
					config.success({userInfo});
				},
				fail: config.fail,
				complete: config.complete,
			});
		};
	
		app.sdk.request = (config) => {
			config.headers = config.header;
			app.sdk.httpRequest(config);
		};
	
		const getStorageSync = app.sdk.getStorageSync;
		app.sdk.getStorageSync = (key) => {
			const cache = getStorageSync({key});
			return cache && cache.data;
		};
	
		const setStorageSync = app.sdk.setStorageSync;
		app.sdk.setStorageSync = (key, data) => {
			setStorageSync({
				key,
				data,
			});
		};
	
		const showLoading = app.sdk.showLoading;
		app.sdk.showLoading = (config) => {
			config.content = config.title;
			showLoading(config);
		};
	
		const showToast = app.sdk.showToast;
		app.sdk.showToast = (config) => {
			config.content = config.title;
			showToast(config);
		};
	
	
		const setNavigationBar = app.sdk.setNavigationBar  
		app.sdk.setNavigationBar = (config) => {
			setNavigationBar({
				title: config.title,
			})
		}
	
		app.sdk.setNavigationBarTitle = (config) => {
			setNavigationBar({
				title: config.title,
			})
		}
};
