/**
 * Author: Meng
 * Date: 2022-03-09
 * Desc: 登录
 * 登录页可配参数{ action: '意图', path?: '页面路径', params?: '参数' }
 */

import { wechatLogin, queryShopRole } from '../../../modules/api/index';
import { Scope, authorize } from '../../../modules/auth/index';
import Bus, { BusKey } from '../../../modules/bus/index';
import Configs from '../../../config/index';
import WS from '../../../modules/network/socket';
import { saveAccountInfo } from '../../../modules/store/index';

Page({
  data: {
    shopId: 1,
    account: '',
    password: '',
    btnStyle:
      'width: 100%; padding: 24rpx 0; background-color: #323232;color: white;',
    usePhone: false,
    canIUseProfile: false,
    loginAction: { action: '', path: '', params: '' },
  },
  onLoad: function (options) {
    let that = this;
    let _dataObj = { loginAction: options };
    if (wx.getUserProfile) {
      _dataObj.canIUseProfile = true;
    }

    that.parseAction(options, _dataObj);

    that.setData(_dataObj);
  },

  parseAction: function (options, dataObj) {
    const that = this;
    if (options.action) {
      try {
        const action = options.action;
        switch (action) {
          case 'join':
            const shopId = parseInt(options.sid||'0');
            Configs.shopId = shopId;
            that.setData({ shopId });
            break;
          case 'register':
            break;
        }
      } catch (error) {
        console.log('-------> login action parse Error:', options.account);
      }
    }
  },

  bindInputPhone: function (e) {
    this.data.account = e.detail.value;
  },
  bindInputPwd: function (e) {
    this.data.password = e.detail.value;
  },
  getUserInfo: function (e) {
    console.log('getUserInfo');
    authorize(Scope.userInfo).then((res) => {
      console.log(res);
      wx.getUserInfo({
        desc: '用于完善会员资料',
        success: (res) => {
          wx.login({
            success: async (res2) => {
              this.onLogin(res, res2.code);
            },
          });
        },
      });
    });
  },
  getUserProfile: function (e) {
    console.log('getUserProfile');
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        wx.login({
          success: async (res2) => {
            this.onLogin(res, res2.code);
          },
        });
      },
    });
  },

  onCutLoginType: function () {
    this.setData({ usePhone: true });
  },

  onLogin: async function (info, sign) {
    const that = this;
    
    console.log(info); // info.signature "0f0a37febbb485646beeb44a9ccecda991739e4e"
    const user = info.userInfo;
    const shopId = that.data.shopId;
    const { code, data } = await wechatLogin({
      sign,
      shopId,
      nickname: user.nickName,
      icon: user.avatarUrl,
    });
    if (code == 0) {
      const staffRes = await queryShopRole(data.id);
      if (staffRes.code == 0) {
        // staffRes.data 不为空为店员
        const staffs = staffRes.data || [];
        if (staffs.length > 0) {
          data.shopId = staffs[0].sid;
          data.userRole = staffs[0].level;
        }
      }
      this.saveUserInfo(data);
    }
  },

  saveUserInfo: function (user) {
    const that = this;
    const loginAction = that.data.loginAction;
    Configs.userId = user.id;
    Configs.token = user.token;
    saveAccountInfo(user);
    Bus.send(BusKey.login, user, 500);

    WS.connect();
    if (loginAction.action == 'skip') {
      const url = loginAction.path;
      wx.redirectTo({ url });
    } else {
      wx.navigateBack();
    }
  },
});
