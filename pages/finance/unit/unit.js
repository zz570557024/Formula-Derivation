Page({
  data: {
    cities: ["米(m)", "千米(km)", "厘米(cm)", "毫米(mm)", "英尺(ft)", "英寸(in)"],
    typeIndex: 0,
    unitIndex: 0,
    userInput: '',
    input: 0,
    id: 0,
    datas: [{
      lent: [{
        unit: '米(m)',
        value: 0
      }, {
        unit: '千米(km)',
        value: 0
      }, {
        unit: '厘米(cm)',
        value: 0
      }, {
        unit: '毫米(mm)',
        value: 0
      }, {
        unit: '英尺(ft)',
        value: 0
      }, {
        unit: '英寸(in)',
        value: 0
      }]
    }]
  },
  bindCityChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e);
    this.setData({
      unitIndex: e.detail.value
    })
    this.calculate()
  },
  calculate() {
    var o = this.data.datas[this.data.typeIndex].lent;
    var len = o.length;
    var std = 0;
    //console.log(this.data.unitIndex, this.data.input)
    switch (Number(this.data.unitIndex)) {
      case 0:
        std = this.data.input;
        break
      case 1:
        std = this.data.input * 1000;
        break;
      case 2:
        std = this.data.input / 100;
        break;
      case 3:
        std = this.data.input / 1000;
        break;
      case 4:
        std = this.data.input / 3.28083989501;
        break;
      case 5:
        std = this.data.input / 39.3700787402;
        break;
      default:
        break;
    }
    for (let i = 0; i < len; i++) {
      switch (i) {
        case 0:
          o[i].value = std;
          break;
        case 1:
          o[i].value = std / 1000;
          break;
        case 2:
          o[i].value = std * 100;
          break;
        case 3:
          o[i].value = std * 1000;
          break;
        case 4:
          o[i].value = std * 3.28083989501;
          break;
        case 5:
          o[i].value = std * 39.3700787402;
          break;
        default:
          break;
      }
    }
    this.setData({
      datas: this.data.datas,
    });
  },
  changeShebao(e) {
    var input = Number(e.detail.value);
    if (input < 0) input = 0;
    this.setData({
      input: input
    })
    this.calculate()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //修改页面标题
    // wx.setNavigationBarTitle({
    //   title: this.data.datas[options.id].name,
    // })
    // console.log('id', options.id)
    // this.setData({
    //   id: options.id
    // });
  },
  onShareAppMessage: function () {
    return {
      title: '长度单位换算',
      path: '/pages/wuxian-yijin/wxyje',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
});