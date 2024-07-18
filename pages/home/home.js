/**
 * Author: Meng
 * Date: 2022-03-09
 * Desc:
 */

import { updateTabelStatus, queryShopTables } from '../../modules/api/index';
import Bus, { BusKey } from '../../modules/bus/index';
import Configs from '../../config/index';
import { hasLogin, getAccountInfo } from '../../modules/store/index';

let lastShowTimer = 0;

Page({
  data: {
    isLogin: false,
    userIcon: '',
    alertMsg: null,
    banners: ['/assets/img/home_banner.png'],
    items: [],
  },

  onLoad: function () {
    const that = this;
    // that._querySeatList();
  },

  onShow: function () {
    let that = this;
    const isLogin = that.data.isLogin;
    const info = getAccountInfo();
    if (info && info.id) {
      if (!isLogin) {
        that.setData({ userIcon: info.icon, isLogin: true });
        that.onLinkChat();
      }
    } else if (isLogin) {
      that.setData({ userIcon: '', isLogin: false });
      // WS.close();
    }
  },

  onPullDownRefresh() {
    const that = this;
    that._querySeatList();
    wx.stopPullDownRefresh();
  },

  onReachBottom() {},

  onLinkChat: function () {
    const that = this;
    Bus.add(
      BusKey.webSocket,
      (msg) => {
        that.setData({ alertMsg: msg });

        wx.vibrateShort({});
        clearTimeout(lastShowTimer);
        lastShowTimer = setTimeout(() => {
          clearTimeout(lastShowTimer);
          that.setData({ alertMsg: null });
        }, 2000);
      },
      'home'
    );
  },

  onTabUser: function () {
    const that = this;
    if (that.data.isLogin) {
      wx.navigateTo({ url: '/pages/my/my' });
    } else {
      wx.navigateTo({ url: '/pages/my/login/login' });
    }
  },

  onItemPress: function (e) {
    // let tag = e.currentTarget.dataset.tag;
    let tag = e.detail.tag;
    let id = e.detail.id;
    if (tag == 2) {
      let used = e.detail.used == 0? 1 : 0;
      wx.showModal({
        title: '温馨提示',
        content: `确认客人${used ? '已入座':'已离席'}`,
        success: (res) => {
          if (res.confirm) {
            this._changeTable({ used, id });
          }
        },
      });
    } else {
      wx.showActionSheet({
        alertText: '选择状态',
        itemList: ['已收桌', '待收桌'],
        success: (res) => {
          // console.log(res);
          this._changeTable({ status: res.tapIndex, id });
        },
      });
    }
  },

  onClickMsg: function (e) {
    let id = e.currentTarget.dataset.id;
    let num = e.currentTarget.dataset.num;
    wx.navigateTo({
      url: `/pages/chat/chat?num=${num}&id=${id}`,
    });
  },

  //
  _querySeatList: async function () {
    const that = this;
    const sid = Configs.shopId;
    const { code, data } = await queryShopTables(sid);
    if (code == 0) {
      that.setData({ items: data });
    }
  },

  _changeTable: async function (params) {
    const { code, data } = await updateTabelStatus(params);
    if(code == 0) {
      this._querySeatList();
    }
  },
});
