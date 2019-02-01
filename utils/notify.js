const showLoading = (msg, mask=false) => uni.showLoading({ title: msg || '加载中...', mask, });
const hideLoading = () => uni.hideLoading();
const iconPath = ['success', 'error', 'info', 'warn'];
const showToast = (msg, type=2) => {
	hideLoading();
	uni.showToast({ title: msg || '处理中...', duration: 1500, image: `../../images/toast/${iconPath[type] || 'info'}.png` });
}
const showError = err => showToast(err.errorMsg || '网络错误', 1);

module.exports = {
	showToast,
	showError,
	showLoading,
	hideLoading,
};
