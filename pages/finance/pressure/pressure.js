Page({
  data: {
    cities: ["千帕(kpa)", "帕斯卡(Pa)", "百帕(hpa)", "毫米水柱", "毫米汞柱(mmHg)", "标准大气压(atm)",  "巴(bar)", "毫巴(mbar)"],
    typeIndex: 0,
    unitIndex: 0,
    userInput: '',
    input: 0,
    id: 0,
    datas: [{
      lent: [{
        unit: '千帕(kpa)',
        value: 0
      }, {
        unit: '帕斯卡(Pa)',
        value: 0
      }, {
        unit: '百帕(hpa)',
        value: 0
      }, {
        unit: '毫米水柱',
        value: 0
      }, {
        unit: '毫米汞柱(mmHg)',
        value: 0
      }, {
        unit: '标准大气压(atm)',
        value: 0
      }, {
        unit: '巴(bar)',
        value: 0
      }, {
        unit: '毫巴(mbar)',
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
    console.log(this.data.unitIndex, this.data.input)
    switch (Number(this.data.unitIndex)) {
      case 0:
        std = this.data.input;
        break
      case 1:
        std = this.data.input / 1000;
        break;
      case 2:
        std = this.data.input / 10;
        break;
      case 3:
        std = this.data.input * 0.0098066;
        break;
      case 4:
        std = this.data.input * 0.1333224;
        break;
      case 5:
        std = this.data.input * 101.325;
        break;
      case 6:
        std = this.data.input * 100;
        break;
      case 7:
        std = this.data.input / 10;
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
          o[i].value = std * 1000;
          break;
        case 2:
          o[i].value = std * 10;
          break;
        case 3:
          o[i].value = std / 0.0098066;
          break;
        case 4:
          o[i].value = std / 0.1333224;
          break;
        case 5:
          o[i].value = std / 101.325;
          break;
        case 6:
          o[i].value = std / 100;
          break;
        case 7:
          o[i].value = std * 10;
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
      title: '压强单位换算你',
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