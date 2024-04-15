/**
 * Author: Meng
 * Date: 2022-10-09
 * Desc: 
 */
import Bus, { BusKey } from '../../modules/bus/index';
Component({
  properties: {
    item: {
      type: Object,
      value: {}
    },
    text: {
      type: String,
      value: ''
    },
    max: {
      type: Number,
      value: 200
    }
  },

  data: {
    newMsg: {},
  },
  lifetimes: {
    ready: function() {
      const that = this;
      const item = that.data.item;
      Bus.add(BusKey.webSocket, (newMsg) => {
        console.log(newMsg)
        if(item.seats == newMsg.num) {
          that.setData({newMsg})
        }
      }, "table" + item.id);
    }
  },
  methods: {
    onTablePress: function () {
      const item = this.data.item;
      let id = item.id;
      let num = item.num;
      wx.navigateTo({
        url: `/pages/chat/chat?num=${num}&id=${id}`,
      });
    },

    onChangeUse: function() {
      const that = this;
      const used = that.data.item.used;
      const id = that.data.item.id;
      that.triggerEvent('press', {tag: 2, used, id });
    },
    onChangeStatus: function() {
      const that = this;
      const id = that.data.item.id;
      that.triggerEvent('press', {tag: 1, id});
    },
  }
})
