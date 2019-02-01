const setToken = (k, v, t) => {
	//##ifdef %APP-PLUS MP-WEIXIN%
	return uni.getStorageSync(k);
	//#endif
	
	//#ifdef H5
	var d = new Date();
  d.setTime(d.getTime() + t * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = k + "=" + v + "; " + expires;
	//#endif
};

const getToken = (k) => {
	//##ifdef %APP-PLUS MP-WEIXIN%
	return uni.getStorageSync(k);
	//#endif
	var name = k + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}

module.exports = {
	setToken,
	getToken,
};