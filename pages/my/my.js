/**
 * Author: Meng
 * Date: 2022-04
 * Desc: 我的
 */
import { updateAccount } from '../../modules/api/index';
import Configs from '../../config/index';
import { checkLogin, getAccountInfo, saveAccountInfo } from '../../modules/store/index';

const defUserInfo = { icon: '/assets/icon/user.png', nickname: '立即登录' };

Page({
  data: {
    isLogin: false,
    user: defUserInfo,
    userId: 0,
    topData: {
      show: true,
      card: 0, // 卡
      coupon: 0, // 优惠券
      point: 0, // 积分
      level: '普通会员',
    },
    banners: ['/assets/img/home_banner.png'],
    menulist: [
      // {
      //   id: 0,
      //   key: 'scan',
      //   name: '扫码',
      //   icon: '/assets/icon/scan_ic1.png',
      // },
      {
        name: '人员管理',
        key: 'team',
        icon: '/assets/icon/m_gift.png',
        path: '/pages/shop/staff/staff',
      },
      {
        name: '桌位管理',
        key: 'table',
        icon: '/assets/icon/m_gift.png',
        path: '/pages/shop/table/table',
      },
      {
        name: '消息模版',
        key: 'event',
        icon: '/assets/icon/m_feedback.png',
        path: '/pages/shop/msgs/msgs',
      },
      {
        name: '建议反馈',
        key: 'feedback',
        icon: '/assets/icon/m_feedback.png',
        path: '/pages/my/feedback/feedback',
      },
      {
        name: '设置',
        key: 'setting',
        icon: '/assets/icon/m_setting.png',
        path: '/pages/my/setting/setting',
      },
      // {
      //   name: '关于',
      //   key: '',
      //   icon: '/assets/icon/m_about.png',
      //   path: '',
      // },
    ],
  },

  onLoad: function (options) {
    const that = this;
    if(Configs.userRole < 3) {
      let list = that.data.menulist;
      list = list.filter(e => e.key != 'team');
      that.setData({menulist: list});
    }
  },

  onReady: function () {
    const that = this;
  },

  onShow: function () {
    let that = this;
    const isLogin = that.data.isLogin;
    const info = getAccountInfo();
    if (info && info.id) {
      if (!isLogin) {
        const user = info;
        // const user = { icon: info.icon, nickname: info.nickname };
        that.setData({ user, isLogin: true });
      }
    } else if (isLogin) {
      that.setData({ user: defUserInfo, isLogin: false });
    }
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  // 修改头像
  getUserProfile: function (e) {
    const that = this;
    let login = checkLogin();
    if (login) {
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          // console.log(res);
          const info = res.userInfo;
          const userInfo = that.data.user;
          const user = {
            ...userInfo,
            icon: info.avatarUrl,
            nickname: info.nickName,
          };
          that.setData({ user });
          updateAccount(user);
          saveAccountInfo(user);
        },
      });
    } else {
      that.showLogin();
    }
  },
  // 登录/查看个人信息
  onUserInfo: function () {
    const that = this;
    let login = checkLogin();
    if (login) {
    } else {
      that.showLogin();
    }
  },

  gotoQrcode: function () {
    let login = checkLogin(1);
    if (login) {
      wx.navigateTo({
        url: '/pages/my/qrcode/qrcode',
      });
    }
  },
  // 积分/优惠券/足迹
  onTabClick: function (e) {
    // let that = this;
    let idx = parseInt(e.currentTarget.dataset.idx);
    let login = checkLogin(0);
    if (login) {
      let paths = [
        '/page_sundries/pages/account/score/score',
        '/page_minor/pages/coupon/coupon',
        '/page_sundries/pages/account/foot_print/foot_print',
      ];
      let url = paths[idx];
      wx.navigateTo({
        url,
      });
    }
  },
  // 领券中心
  gotoCoupon: function () {},
  // 菜单事件
  onMenuClick: function (e) {
    const that = this;
    let idx = parseInt(e.currentTarget.dataset.idx);
    const item = that.data.menulist[idx];
    switch (item.key) {
      case 'scan':
        that.openScan();
        return;
      default:
        break;
    }
    wx.navigateTo({ url: item.path });
  },
  openScan: function () {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success: (res) => {
        console.log(res.result);
      },
    });
  },
  // 显示登录提示弹窗
  showLogin: function () {
    // wx.showModal({
    //   title: '请先登录',
    //   content: '您还未登录请先登录',
    //   success: (e) => {
    //     if (e.confirm) {

    //     }
    //   },
    // });

    wx.navigateTo({ url: '/pages/my/login/login' });
  },

  // 获取用户信息
  getOwnerInfo: async function () {
    const that = this;
  },
});
