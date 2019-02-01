const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
};
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};
// 手机号验证
const phoneValid = phone => {
  return (/^1(30|31|32|45|55|56|66|75|76|85|86)\d{8}$/).test(phone);
};
// 身份证号码验证
const idCodeValid = code => {
  return (/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/ || /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/).test(code);
};
// 数字和字母输入正则
const NumAndLetter = code => {
  return (/^[A-Za-z0-9]+$/).test(code);
};

//获取当前页路由
const getCurrentPageRoute = () => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length-1];
  const route = `/${currentPage.route}`;
  return route;
};

const getQueryForPage = (p) => {
  return Object.entries(p.options).map(p => p.join('=')).join('&');
};
//获取当前页面路径
const getCurrentPageUrl = () => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length-1];
  const query = getQueryForPage(currentPage);
  const route = currentPage.route;
  if (query) {
    return `${route}?${query}`;
  }
  return route;
};
//获取根页面路径
const getRootPageUrl = () => {
  const pages = getCurrentPages();
  const rootPage = pages[0];
  const query = getQueryForPage(rootPage);
  const route = `/${rootPage.route}`;
  if (query) {
    return `${route}?${query}`;
  }
  return route;
};
const rangeTime = () => {
  var d = new Date();
  d.setDate(1);
  var result = [];
  for (var i = 0; i < 6; i++) {
    d.setMonth(d.getMonth() - 1);
    var m = d.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    result.push(d.getFullYear() + "年" + m + '月');
  }
  return result;
};

module.exports = {
  formatTime,
  phoneValid,
  idCodeValid,
  NumAndLetter,
  getCurrentPageRoute,
  getCurrentPageUrl,
  getRootPageUrl,
	getTokenType,
  rangeTime,
};
