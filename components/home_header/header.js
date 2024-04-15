/**
 * Author: Meng
 * Date: 2022-04
 * Desc: 小程序头布局
 */
Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    icon: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '百安居',
    },
    fixed: {
      type: Boolean,
      value: true,
    },

  },
  data: {
    ios: false,
    innerPaddingRight: '',
    statusBarHeight: 0,
    innerWidth: '',
    leftWidth: '',
    displayStyle: '',
  },
  lifetimes: {
    
    attached: function () {
      let _this = this;
      let isSupport = wx.getMenuButtonBoundingClientRect != null;
      if (isSupport) {
        let rect = wx.getMenuButtonBoundingClientRect();
        wx.getSystemInfo({
          success: function success(res) {
            let ios = !!(res.system.toLowerCase().search('ios') + 1);
            const widthPx = `${res.windowWidth - rect.left}px`;
            _this.setData({
              ios,
              statusBarHeight: res.statusBarHeight,
              innerWidth: isSupport ? 'width:' + rect.left + 'px' : '',
              innerPaddingRight: isSupport ? 'padding-right:' + widthPx : '',
              leftWidth: isSupport ? 'width:' + widthPx : '',
            });
          },
        });
      }
    },
  },

  methods: {
    showChange: function () {},
    onUserTab: function() {
      this.triggerEvent('user', {});
    },
    // back: function back() {
    //   let data = this.data;
    //   wx.navigateBack({
    //     delta: data.delta,
    //   });
    //   this.triggerEvent(
    //     'back',
    //     {
    //       delta: data.delta,
    //     },
    //     {}
    //   );
    // },
  },
});
