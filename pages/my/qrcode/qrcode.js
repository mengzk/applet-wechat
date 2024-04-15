/**
 * Author: Meng
 * Date: 2022-03-09
 * Desc: 绘制二维码
 * https://developers.weixin.qq.com/miniprogram/dev/framework/ability/canvas.html
 */

import Configs from "../../../config/index";
import QRCode from "../../../utils/qrcode";

let _qrcode = null;

Page({
  data: {

  },

  onLoad: function (options) {},

  onReady: function () {
    this.drawQrcode();
  },

  onUnload: function() {
    if(_qrcode) {
      _qrcode.clear();
    }
  },

  onShareAppMessage: function () {},

  drawQrcode: function () {
    if(_qrcode) {
      _qrcode.clear();
    }
    const num = Math.round(Math.random()*1000);
    const codeStr = `${Configs.userId + Configs.idVar}-${num+ 1000}`
    _qrcode = new QRCode('qrcode_cv', {
      text: codeStr,
      width: 200,
      height: 200,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.correctLevel.H
    });
  },

  onSaveImg: function () {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 500,
      height: 500,
      destWidth: 500,
      destHeight: 500,
      canvasId: 'qrcode_cv',
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        });
      },
    });
  },
});
