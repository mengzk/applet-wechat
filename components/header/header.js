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
    title: {
      type: String,
      value: '百安居',
    },
    opacity: {
      type: Number,
      value: 1,
    },
    background: {
      type: String,
      value: 'white',
    },
    color: {
      type: String,
      value: '#232323',
    },
    back: {
      type: Boolean,
      value: true,
    },
    loading: {
      type: Boolean,
      value: false,
    },
    animated: {
      type: Boolean,
      value: true,
    },
    show: {
      type: Boolean,
      value: true,
      observer: '_showChange',
    },
    delta: {
      type: Number,
      value: 1,
    },
    fixed: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    displayStyle: '',
  },
  attached: function attached() {
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

  methods: {
    _showChange: function _showChange(show) {
      let animated = this.data.animated;
      let displayStyle = '';
      if (animated) {
        displayStyle =
          'opacity: ' +
          (show ? '1' : '0') +
          ';-webkit-transition:opacity 0.5s;transition:opacity 0.5s;';
      } else {
        displayStyle = 'display: ' + (show ? '' : 'none');
      }
      this.setData({
        displayStyle: displayStyle,
      });
    },
    back: function back() {
      let data = this.data;
      wx.navigateBack({
        delta: data.delta,
      });
      this.triggerEvent(
        'back',
        {
          delta: data.delta,
        },
        {}
      );
    },
  },
});
