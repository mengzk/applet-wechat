/**
 * Author: Meng
 * Date: 2022-03-09
 * Desc: 意见反馈
 */
import { addFeedback } from '../../../modules/api/index';
import { getAccountInfo } from '../../../modules/store/index';

Page({
  data: {
    uid: 0,
    title: '',
    content: '',
  },
  onLoad: function (options) {
    const info = getAccountInfo();
    this.setData({ uid: info.id });
  },
  onTitle: function (e) {
    this.data.title = e.detail.value;
  },
  onCommit: async function () {
    let { uid, title, content } = this.data;
    if (title.length < 1) {
      wx.showToast({
        title: '请输入反馈标题',
        icon: 'none',
      });
    } else if (content.length < 1) {
      wx.showToast({
        title: '请输入反馈内容',
        icon: 'none',
      });
    } else {
      const { code, data } = await addFeedback({ uid, title, content });
      if(code ==0) {
        wx.navigateBack();
        const timer = setTimeout(() => {
          clearTimeout(timer);
          wx.showToast({
            icon: 'success',
            title: '提交成功！',
          })
        }, 500);
      }
    }
  },
  onContent: function (e) {
    this.data.content = e.detail.value;
  },
});
