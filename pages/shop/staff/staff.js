/**
 * Author: Meng
 * Date: 2022-03-09
 * Desc: 添加店员
 * 1.分享一个小程序卡片；
 * 2.打开分享的卡片；
 * 3.授权登录，自动注册并绑定店铺
 * 4.可以改权限
 */
import { queryShopStaff, updateStaff, createStaff } from "../../../modules/api/index";
import Configs from "../../../config/index";

Page({
  data: {
    showPop: false,
    editItem: {},
    style: 'width: 80px; height: 80px;',
    staffList: [],
  },
  onLoad (options) {
    this._getShopStaff();
  },

  onPullDownRefresh() {
    this._getShopTables();
    wx.stopPullDownRefresh();
  },

  // onShareAppMessage(e) {
  //   // console.log('share', e);
  //   return {
  //     title: '邀请你加入新店铺',
  //     imageUrl: 'https://dhstatic.bthome.com/img/activity/jiabohui/round3/logo.png',
  //     path: `/pages/index/index?action=join&sid=${Configs.shopId}&share=123456`,
  //   }
  // },

  
  onCallPhone: function(e) {
    let item = e.currentTarget.dataset.item;
    let phoneNumber = item.phone;
    wx.makePhoneCall({phoneNumber,fail: () =>{}});
  },

  onEditStaff: function(e) {
    let editItem = e.currentTarget.dataset.item;
    this.setData({ showPop: true, editItem });
  },

  onInputStaff: function(e) {
    const that = this;
    const params = e.detail;
    // console.log(detail)
    const state = {showPop: false, editItem: {}};
    if(params) {
      that._commitStaff(params);
    }
    that.setData(state);
  },

  onAddUser: function() {
    wx.scanCode({
      scanType: ['qrCode'],
      success: (res) => {
        const code = res.result;
        console.log(code)
        if(code && code.includes('-')) {
          const that = this;
          const uid = parseInt(code.split('-')[0])-Configs.idVar;
          const editItem = {uid, sid: Configs.shopId};
          that._createStaff(editItem);
          that.setData({ showPop: true, editItem });
        }else {
          wx.showToast({ title: '二维码信息不正确' });
        }
      },
      fail: () => {}
    });
  },

  _getShopStaff: async function() {
    const {code, data} = await queryShopStaff(1);
    if(code == 0) {
      this.setData({staffList: data});
    }
  },
  _commitStaff: async function(params) {
    // console.log(params)
    const {code, data} = await updateStaff(params);
    if(code == 0) {
      wx.showToast({ title: '操作成功！' });
      this._getShopStaff();
    }
  },
  _createStaff: async function(params) {
    // console.log(params)
    const {code, data} = await createStaff(params);
    if(code == 0) {
      wx.showToast({ title: '操作成功！' });
      this._getShopStaff();
    }
  }

});
