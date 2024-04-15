/**
 * Author: Meng
 * Date: 2022-03-09
 * Desc: 小程序更新 需要 《异步操作》
 */

// 小程序版本升级提示
async function check() {
  const manager = wx.getUpdateManager();

  manager.onUpdateReady(() => {
    wx.showModal({
      title: '更新提示',
      content: '发现新版本，是否立即体验？',
      success: (res) => {
        if (res.confirm) {
          manager.applyUpdate(); // 新的版本已下载好，打开并重启
        }
      },
    });
  });
  //   manager.onCheckForUpdate(); // 检测新版本信息的回调
  //   manager.onUpdateFailed(); // 新版本下载失败
}
const Update = {
    check,
};

export default Update;
