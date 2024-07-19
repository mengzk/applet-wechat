Component({
  // properties: {},
  data: {
    selected: 0,
    color: '#979797',
    selectedColor: '#232323',
    list: [
      {
        text: '首页',
        pagePath: 'pages/home/home',
        // icon: '',
        // color: '',
        defIcon: '/assets/icon/tab_home_off.png',
        selectedIcon: '/assets/icon/tab_home_on.png',
      },
      {
        text: '福利',
        pagePath: 'pages/welfare/index',
        defIcon: '/assets/icon/tab_welf_off.png',
        selectedIcon: '/assets/icon/tab_welf_on.png',
      },
      {
        text: '我的',
        pagePath: 'pages/my/my',
        defIcon: '/assets/icon/tab_my_off.png',
        selectedIcon: '/assets/icon/tab_my_on.png',
      },
    ],
  },
  /**
   *
   */
  lifetimes: {
    attached: function () {
      this.onChangeTab(0);
    },
  },
  /**
   *
   */
  methods: {
    switchTab(e) {
      const { path, index } = e.currentTarget.dataset;
      wx.switchTab({ url: path });

      this.onChangeTab(index);
    },

    onChangeTab(index) {
      const that = this;
      const { color, selectedColor, list } = that.data;
      const tabs = [].concat(list);

      tabs.forEach((e, idx) => {
        if (index == idx) {
          e.color = selectedColor;
          e.icon = e.selectedIcon;
        } else {
          e.color = color;
          e.icon = e.defIcon;
        }
      });

      that.setData({ list: tabs });
    },
  },
});
