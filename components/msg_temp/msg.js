/**
 * Author: Meng
 * Date: 2022-10-09
 * Desc: 
 */
import Configs from "../../modules/config/index";

Component({
  properties: {},
  data: {
    curIndex: -1,
    msgList: [],
  },
  lifetimes: {
    attached: function() {
      this.setData({msgList: Configs.msgTemps});
    }
  },
  methods: {
    
    onItemPress: function (e) {
      let curIndex = parseInt(e.currentTarget.dataset.idx);
      this.setData({curIndex});
    },

    onCommit: function () {
      const that = this;
      const {curIndex, msgList} = that.data;
      if(curIndex > -1) {
        that.triggerEvent('res', msgList[curIndex]);
      }else {
        that.triggerEvent('res', null);
      }
    },
    onCancel: function () {
      this.triggerEvent('res', null);
    },
  },
});
