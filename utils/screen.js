/**
 * Author: Meng
 * Date: 2022-03-09
 * Desc: 解析 启动参数 《异步操作》
 * 
场景值	场景	          appId含义
1011	扫描二维码	
1012	长按图片识别二维码	
1013	扫描手机相册中选取的二维码
1034	微信支付完成页
1035	公众号自定义菜单	   来源公众号
1036	App 分享消息卡片	  来源App
1047	扫描小程序码	
1048	长按图片识别小程序码	
1049	扫描手机相册中选取的小程序码
1065	URL scheme
 */

// 解析 小程序打开 Screen 参数
async function parse(options) {
  _printLog(options);
  
  let path = options.path;
  let query = options.query;

  const scene = options.scene;
  switch (scene) {
    case 1007: // 单人聊天会话中的小程序消息卡片
      break;
    case 1008: // 群聊会话中的小程序消息卡片
      break;
    case 1017: // 小程序体验版的入口页
      break;
    case 1036: // App 分享消息卡片
      break;
    case 1065: // URL scheme
      break;
    default:
      break;
  }
}

function _printLog(msg) {
  console.log('---> screen log:');
  console.log(msg);
}

const Screen = {
  parse,
};

export default Screen;
