/**
 * Author: Meng
 * Date: 2022-10-09
 * Desc: 
 */
Component({
  properties: {
    item: {
      type: Object,
      value: {},
    },
  },
  data: {
    num: 0,
    intro: '',
  },
  lifetimes: {
    attached: function () {
      const that = this;
      const item = that.data.item;
      that.setData({ num: item.num, intro: item.intro });
      // console.log(this.data)
    },
  },
  methods: {
    onInputCode: function (e) {
      this.data.num = e.detail.value;
    },
    onInputDesc: function (e) {
      this.data.intro = e.detail.value;
    },

    onCommit: function () {
      const that = this;
      const { num, intro, item } = that.data;
      if (!num) {
        wx.showToast({
          title: '请输入桌位号',
          icon: 'none',
        });
      }
      const params = { num, intro };
      if (item && item.id) {
        params.id = item.id;
      }
      that.triggerEvent('commit', params);
    },
    onCancel: function () {
      this.triggerEvent('commit', null);
    },
  },
});
