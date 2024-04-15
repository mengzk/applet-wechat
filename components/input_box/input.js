// 
Component({
  properties: {
    hint: {
      type: String,
      value: '请输入'
    },
    text: {
      type: String,
      value: ''
    },
    max: {
      type: Number,
      value: 200
    }
  },

  data: {
    input: '',
    count: 0,
  },

  methods: {
    onInputText: function(e) {
      const that = this;
      const input = e.detail.value;
      that.setData({input});
      that.triggerEvent('change', input);
    },
    onBlur: function() {
      const that = this;
      const input = that.data.input;
      that.triggerEvent('blur', input);
    }
  }
})
