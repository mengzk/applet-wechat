/**
 * Author: Meng
 * Date: 2022-03-09
 * Desc: 绘制二维码
 */

import Configs from '../../../config/index';
import QRCode from '../../../utils/qrcode';

let _qrcode = null;

Page({
  data: {
    id: 0,
    num: 0,
    sid: 0,
  },

  onLoad: function (options) {
    const that = this;
    // console.log(options);
    let id = 0, num = 0, sid = 0;
    if (options.id) {
      id = parseInt(options.id);
      num = parseInt(options.num);
      sid = parseInt(options.sid);
    }
    that.setData({ id, sid, num }, that.drawQrcode);
  },

  onReady: function () {},

  onUnload: function () {
    if (_qrcode) {
      _qrcode.clear();
    }
  },

  onShareAppMessage: function () {},

  drawQrcode: function () {
    const {id, num, sid} = this.data;
    if (_qrcode) {
      _qrcode.clear();
    }
    const codeStr = `${Configs.shopVar+sid}-${Configs.seatVar+num}`;
    _qrcode = new QRCode('qrcode_cv', {
      text: codeStr,
      width: 200,
      height: 200,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.correctLevel.H,
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
          fail: (err) => {},
        });
      },
    });
  },
});
