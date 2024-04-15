/**
 * Author: Meng
 * Date: 2022-03-09
 * Desc: 消息管理
 */
import { queryShopEvent, updateOrCreateEvent } from "../../../modules/api/index";
import Configs from "../../../config/index";
Page({
  data: {
    eventList: [],
    editItem: {},
    showPop: false,
  },
  onLoad (options) {
    this._getShopEvents();
  },

  onPullDownRefresh() {
    this._getShopEvents();
    wx.stopPullDownRefresh();
  },


  onEditEvent: function(e) {
    let editItem = e.currentTarget.dataset.item;
    this.setData({ showPop: true, editItem });
  },

  onEventInput: function(e) {
    const that = this;
    const params = e.detail;
    // console.log(detail)
    const state = {showPop: false, editItem: {}};
    if(params) {
      that._commitEvent(params);
    }
    that.setData(state);
  },

  onCommit: function () {
    this.setData({ showPop: true });
  },

  _getShopEvents: async function() {
    const {code, data} = await queryShopEvent(Configs.shopId);
    if(code == 0) {
      this.setData({eventList: data});
    }
  },

  _commitEvent: async function(params) {
    params.sid = Configs.shopId;
    const {code, data} = await updateOrCreateEvent(params);
    if(code == 0) {
      wx.showToast({ title: '操作成功！' });
      this._getShopEvents();
    }
  }
});
