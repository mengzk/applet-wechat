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
    value: '',
    intro: '',
  },
  lifetimes: {
    attached: function () {
      const that = this;
      const item = that.data.item;
      that.setData({ value: item.value, intro: item.intro });
      // console.log(this.data)
    },
  },
  methods: {
    onInputTitle: function (e) {
      this.data.value = e.detail.value;
    },
    onInputDesc: function (e) {
      this.data.intro = e.detail.value;
    },

    onCommit: function () {
      const that = this;
      const { value, intro, item } = that.data;
      if (!value) {
        wx.showToast({
          title: '请输入消息简称',
          icon: 'none',
        });
      }
      const params = { value, intro };
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
