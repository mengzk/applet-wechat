/**
 * Author: Meng
 * Date: 2022-03-09
 * Desc: launch 启动页
 */

Page({
  data: {
    loaded: false,
  },

  onLoad(options) {
    const that = this;
  },
  onReady() {
    const timer3 = setTimeout(() => {
      clearTimeout(timer3);
      wx.reLaunch({ url: '/pages/home/home' });
    }, 1000);
  },
});
