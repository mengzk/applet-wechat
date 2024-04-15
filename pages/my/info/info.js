/**
 * Author: Meng
 * Date: 2022-03-09
 * Desc: 个人信息
 */
const maxH = 260;

Page({
  data: {
    user: { avatar: "/assets/icon/user_ic.png" },
    alpha: 0,
    title: "",
    tabIndex: 0,
    tabList: ["作品", "视频"],
  },

  onLoad: function () {
    let that = this;
  },

  onPullDownRefresh: function () {},

  onReachBottom: function () {},

  onChangeTab: function (e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index;
    this.setData({
      tabIndex: index,
    });
  },

  onPageScroll: function (e) {
    // console.log(e);
    let that = this;
    let alpha = e.scrollTop / maxH;
    if (that.data.alpha > 1 && alpha > 1) {
      return;
    }
    let title = that.data.user.nickName;
    that.setData({
      alpha,
      title: alpha > 0.7 ? title : "",
    });
  },
});
