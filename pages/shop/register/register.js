/**
 * Author: Meng
 * Desc: 注册界面
 */
import { createShop } from '../../../modules/api/index';
import Configs from '../../../config/index';
import { chooseLocation, chooseImage } from '../../../modules/system/index';

let commiting = false;
Page({
  data: {
    logo: '',
    title: '',
    phone: '',
    address: '',
    desc: '',
    imgs: [],
    lat: 0,
    lng: 0,
  },

  onLoad: function (options) {},

  onReady: function () {},

  onShareAppMessage(){
    return {
      title: '邀请你入驻店铺',
      imageUrl: 'https://dhstatic.bthome.com/img/activity/jiabohui/round3/logo.png',
      path: `/pages/index/index?action=register&share=`,
    }
  },

  onChooseLogo: function () {
    chooseImage().then((res) => {
      console.log(res);
      if (res) {
        this.setData({ logo: res[0].tempFilePath });
      }
    });
  },

  onInputPhone: function (e) {
    this.data.phone = e.detail.value;
  },

  onInputName: function (e) {
    this.data.title = e.detail.value;
  },

  onChooseAddress: function (e) {
    chooseLocation().then((res) => {
      console.log(res);
      this.setData({
        address: res.address,
        lat: res.latitude,
        lng: res.longitude,
      });
    });
  },

  onInputDesc: function (e) {
    this.data.desc = e.detail;
  },
  onChooseImg: function (e) {
    console.log(e.detail);
    this.data.imgs = e.detail;
  },

  onCommit: async function () {
    if(commiting) {
      return;
    }
    const that = this;
    const { phone, address, lat, lng, title, logo, desc } = that.data;
    let msg = '';
    if (!title) {
      msg = '请输入店铺名称';
    } else if (!phone) {
      msg = '请输入手机号';
    } else if (!address) {
      msg = '请选择店铺地址';
    } else if (!logo) {
      msg = '选择店铺logo';
    } else if (!desc) {
      msg = '请输入店铺描述';
    }

    if (msg) {
      wx.showToast({ title: msg, icon: 'none' });
      return;
    }
    commiting = true;
    const uid = Configs.userId;
    const {code, data} = await createShop({ uid, title, address, lat, lng, logo, phone, intro: desc });

    if(code ==0) {
      wx.showToast({ title: '添加成功' });
      const timer = setTimeout(() => {
        clearTimeout(timer);
        wx.navigateBack();
      }, 1000);
    }
    commiting = false;
  },

});
