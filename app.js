/**
 * Author: Meng
 * Date: 2022-03-09
 * Desc: 错误日志
 */

import Log from './utils/logger';
import Screen from './utils/screen';
import Shake from './utils/shake';
import Update from './utils/update';

App({
  constants: {
    isProd: true,
    screenHeight: 736,
    width: 414,
    height: 716,
    statusBarHeight: 20,
    bottomBarHeight: 18,
    system: '',
    wxVersion: '',
    brand: '',
  },

  //
  onLaunch: function () {
    const that = this;
    const info = wx.getSystemInfoSync();
    that._setInfo(info);
  },

  //
  onShow: function (options) {
    // const that = this;
    Screen.parse(options);
    Update.check();
  },

  //
  onHide: function () {},

  //
  onError: function (err) {
    const info = this.constants;
    const str = JSON.stringify(err);
    const msg = `wxVersion:${info.wxVersion},system:${info.system},brand:${info.brand}, err:${str}`;
    Log.log(msg, 3);
  },

  // 不存在的页面跳到首页
  onPageNotFound: function (res) {
    console.log('onPageNotFound: ', res);
    wx.reLaunch({ url: '/pages/index/index.js' });
  },
  //   onThemeChange: function(res) {}

  // 获取系统信息
  _setInfo: function (info) {
    let that = this;
    const bottomBarHeight = info.screenHeight - info.safeArea.bottom;

    that.constants.width = info.windowWidth;
    that.constants.height = info.safeArea.height;
    that.constants.screenHeight = info.screenHeight;

    that.constants.statusBarHeight = info.statusBarHeight;
    that.constants.bottomBarHeight = bottomBarHeight;
    that.constants.wxVersion = info.version;
    that.constants.system = info.system;
    that.constants.brand = info.brand;

    Log.print(that.constants, 1);

    const program = wx.getAccountInfoSync();
    const isProd = program.miniProgram.envVersion == 'release';
    that.constants.isProd = isProd;
    if (!isProd) {
      Shake.env();
    }
  },
});
