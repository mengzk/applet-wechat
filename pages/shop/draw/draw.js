// pages/chat/draw/draw.js
Page({
  data: {},
  onLoad(options) {},

  onReady() {
    // const query = wx.createSelectorQuery();
    // query
    //   .select('#qrcode_cv')
    //   .fields({ node: true, size: true })
    //   .exec((res) => {
    //     // Canvas 对象
    //     const canvas = res[0].node;
    //     // 渲染上下文
    //     const ctx = canvas.getContext('2d');
    //     // Canvas 画布的实际绘制宽高
    //     const width = res[0].width;
    //     const height = res[0].height;
    //     // 初始化画布大小
    //     // const dpr = wx.getWindowInfo().pixelRatio;
    //     // canvas.width = width * dpr;
    //     // canvas.height = height * dpr;
    //     // ctx.scale(dpr, dpr);
    //     // 清空画布
    //     ctx.clearRect(0, 0, width, height);
    //     // 绘制红色正方形
    //     ctx.fillStyle = 'rgb(200, 0, 0)';
    //     ctx.fillRect(10, 10, 50, 50);
    //     // 绘制蓝色半透明正方形
    //     ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    //     ctx.fillRect(30, 30, 50, 50);
    //     // 图片对象
    //     const image = canvas.createImage();
    //     // 图片加载完成回调
    //     image.onload = () => {
    //       // 将图片绘制到 canvas 上
    //       ctx.drawImage(image, 0, 0);
    //     };
    //     // 设置图片src
    //     image.src =
    //       'https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon64_wx_logo.png';
    //   });
  },

  onShow() {},

  onUnload() {},

  onShareAppMessage() {},

  saveCanvasToImg: function (canvas) {
    // // 绘制红色正方形
    // ctx.fillStyle = 'rgb(200, 0, 0)';
    // ctx.fillRect(10, 10, 50, 50);

    // // 绘制蓝色半透明正方形
    // ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    // ctx.fillRect(30, 30, 50, 50);

    // 生成图片
    wx.canvasToTempFilePath({
      canvas,
      success: (res) => {
        // 生成的图片临时文件路径
        const tempFilePath = res.tempFilePath;
      },
    });
  },
});
