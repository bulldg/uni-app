const app = getApp();

const shareApp = (title, path, imageUrl) => {
  let obj = {};
  obj.title = title || '沃上海';
  obj.path = path || '/pages/index/index';
  obj.imageUrl = imageUrl || 'https://file.10010sh.cn/images/share.png';
  obj.success = res => {
    console.log(res.shareTickets[0]);
    app.sdk.getShareInfo({
      shareTicket: res.shareTickets[0],
      success: res => {
        console.log(res);
      },
      fail: err =>{
        console.log(err);
      }
    })
  };
  obj.fail = err => {
    console.log(err);
  };
  return obj;
};

module.exports = {
	shareApp
};
