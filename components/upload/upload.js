//
Component({
  properties: {
    max: {
      type: Number,
      value: 9,
    },
    imgs: {
      type: Array,
      value: [],
    },
  },

  data: {
    icon: '/assets/icon/upload_ic.png',
    list: [],
  },

  methods: {
    onChooseImg: function () {
      const that = this;
      const count = that.data.max - that.data.list.length || 1;
      wx.chooseMedia({
        count,
        mediaType: ['image'],
        success: (res) => {
          const files = res.tempFiles;
          if (files) {
            let list = that.data.list;
            list = list.concat(files.map((e) => e.tempFilePath));
            that.setData({ list });
            that.triggerEvent('change', list);
          }
        },
        fail: (err) => {
          console.log('---> chooseMedia', err);
        },
      });
    },
  },
});
