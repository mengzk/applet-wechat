/**
 * Author: Meng
 * Date: 2022-03-09
 * Desc: 座位管理
 */
import { queryShopTables, createShopTable } from "../../../modules/api/index";
import Configs from "../../../config/index";
Page({
  data: {
    tableList: [],
    editItem: {},
    showPop: false,
  },
  onLoad (options) {
    this._getShopTables();
  },

  onPullDownRefresh() {
    this._getShopTables();
    wx.stopPullDownRefresh();
  },


  onEditTable: function(e) {
    let editItem = e.currentTarget.dataset.item;
    this.setData({ showPop: true, editItem });
  },

  onTableDetail: function(e) {
    let item = e.currentTarget.dataset.item;
    // console.log(item)
    wx.navigateTo({
      url: `/pages/shop/table_qrcode/qrcode?id=${item.id}&sid=${item.sid}&num=${item.num}`,
    });
  },

  onTableInput: function(e) {
    const that = this;
    const params = e.detail;
    // console.log(detail)
    const state = {showPop: false, editItem: {}};
    if(params) {
      that._commitTable(params);
    }
    that.setData(state);
  },

  onCommit: function () {
    this.setData({ showPop: true });
  },

  _getShopTables: async function() {
    const sid = Configs.shopId;
    const {code, data} = await queryShopTables(sid);
    if(code == 0) {
      this.setData({tableList: data});
    }
  },

  _commitTable: async function(params) {
    params.sid = Configs.shopId;
    const {code, data} = await createShopTable(params);
    if(code == 0) {
      wx.showToast({ title: '操作成功！' });
      this._getShopTables();
    }
  }
});
