Page({
  data: {
    cities: ["千米/时(km/h)", "米/秒(m/s)", "千米/秒(km/s)", "英里/时(mile/h)", "英寸/秒(in/s)", "节(Knot)"],
    typeIndex: 0,
    unitIndex: 0,
    userInput: '',
    input: 0,
    id: 0,
    datas: [{
      lent: [{
        unit: '千米/时(km/h)',
        value: 0
      }, {
        unit: '米/秒(m/s)',
        value: 0
      }, {
        unit: '千米/秒(km/s)',
        value: 0
      }, {
        unit: '英里/时(mile/h)',
        value: 0
      }, {
        unit: '英寸/秒(in/s)',
        value: 0
      }, {
        unit: '节(Knot)',
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
        std = this.data.input * 3.6;
        break;
      case 2:
        std = this.data.input * 1225.08;
        break;
      case 3:
        std = this.data.input * 1.609344;
        break;
      case 4:
        std = this.data.input * 0.09144;
        break;
      case 5:
        std = this.data.input * 1.852;
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
          var temp = std / 3.6
          o[i].value = temp.toFixed(4);
          break;
        case 2:
          var temp = std / 3600
          o[i].value = temp.toFixed(4);
          break;
        case 3:
          var temp = std / 1.609344
          o[i].value = temp.toFixed(4);
          break;
        case 4:
          var temp = std / 0.09144
          o[i].value = temp.toFixed(4);
          break;
        case 5:
          var temp = std / 1.852
          o[i].value = temp.toFixed(4);
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
    //console.log('126', e.detail.value, input);
    // if (input < 0) input = 0;
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
      title: '速度单位换算',
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