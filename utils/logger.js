/**
 * Author: Meng
 * Date: 2022-03-09
 * Desc: 错误日志
 */

/**
 * 上传日志
 * @param {*} msg 信息
 * @param {*} mode 1:log, 2:info, 3:warn, debug
 */
function log(msg, mode) {
  const logger = wx.getLogManager({ level: 1 });
  if (mode == 1) {
    logger.log(msg);
  } else if (mode == 2) {
    logger.info(msg);
  } else if (mode == 3) {
    logger.warn(msg);
  } else {
    logger.debug(msg);
  }
}

/**
 * 日志
 * @param {*} msg 信息
 * @param {*} mode 1:log, 2:warn, debug
 */
function print(msg, mode) {
  if (mode == 1) {
    console.log(msg);
  } else if (mode == 2) {
    console.warn(msg);
  } else {
    console.error(msg);
  }
}

const Log = {
  log,
  print,
};

export default Log;
