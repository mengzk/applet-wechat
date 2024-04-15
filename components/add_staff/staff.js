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
    name: '',
    phone: '',
  },
  lifetimes: {
    attached: function () {
      const that = this;
      const item = that.data.item;
      that.setData({ name: item.name, phone: item.phone });
      // console.log(this.data)
    },
  },
  methods: {
    onInputName: function (e) {
      this.data.name = e.detail.value;
    },
    onInputPhone: function (e) {
      this.data.phone = e.detail.value;
    },

    onCommit: function () {
      const that = this;
      const { phone, name, item } = that.data;
      if (!name) {
        wx.showToast({
          title: '请输入员工姓名',
          icon: 'none',
        });
      }
      const params = { name, phone };
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
