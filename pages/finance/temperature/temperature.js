Page({
  data: {
    cities: ["摄氏度(℃)", "华氏度(℉)", "开氏度(K)", "兰氏度(°R)", "列氏度(°Re)"],
    typeIndex: 0,
    unitIndex: 0,
    userInput: '',
    input: 0,
    id: 0,
    datas: [{
      lent: [{
        unit: '摄氏度(℃)',
        value: 0
      }, {
        unit: '华氏度(℉)',
        value: 0
      }, {
        unit: '开氏度(K)',
        value: 0
      }, {
        unit: '兰氏度(°R)',
        value: 0
      }, {
        unit: '列氏度(°Re)',
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
        std = (this.data.input - 32) / 1.8;
        break;
      case 2:
        std = this.data.input - 273.15;
        break;
      case 3:
        std = (this.data.input - 491.67) / 1.8;
        break;
      case 4:
        std = this.data.input * 1.25;
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
          o[i].value = std * 1.8 + 32;
          break;
        case 2:
          o[i].value = std + 273.15;
          break;
        case 3:
          o[i].value = std * 1.8 + 491.67;
          break;
        case 4:
          o[i].value = std / 1.25;
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
      title: '温度单位换算',
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