// pages/finance/func/func.js
var atm = require("../../../utils/atm.js");

Page({
  data: {
    // cities: ["高度(m)", "压力(KPa)", "温度(K)", "密度(kg/m³)"],
    cities: ["高度(m)"],
    typeIndex: 0,
    unitIndex: 0,
    userInput: '',
    input: 0,
    id: 0,
    height: {
      min: 0,
      max: 80000
    },
    datas: [{
      lent: [{
        unit: 'm',
        value: '--',
        type: '高度'
      }, {
        unit: 'Pa',
        value: '--',
        type: '压力'
      }, {
        unit: 'K',
        value: '--',
        type: '温度'
      }, {
        unit: 'kg/m³',
        value: '--',
        type: '密度'
      }]
    }]
  },
  bindCityChange: function (e) {
    // console.log('picker country 发生选择改变，携带值为', e);
    this.setData({
      unitIndex: e.detail.value
    })
    this.calculate()
  },
  calculate() {
    var o = this.data.datas[this.data.typeIndex].lent;
    var arr = atm.atm;
    var std = this.data.input / 1000;
    if (Number(this.data.unitIndex) == 0) {
      for (let i = 0; i < arr.length; i++) {
        if (std > arr[i].height && std <= arr[i + 1].height) {
          if ((std - arr[i].height) < (arr[i + 1].height - std)) {
            o[0].value = this.data.input;
            o[1].value = arr[i].pressure;
            o[2].value = arr[i].temperature;
            o[3].value = arr[i].density;
          } else {
            o[0].value = this.data.input;
            o[1].value = arr[i + 1].pressure;
            o[2].value = arr[i + 1].temperature;
            o[3].value = arr[i + 1].density;
          }
        }
      }
    }
    this.setData({
      datas: this.data.datas,
    });
  },
  init() {
    var a = this.data.datas[this.data.typeIndex].lent;
    for (var i = 0; i < a.length; i++) {
      a[i].value = '--'
    }
    this.setData({
      datas: this.data.datas,
      input: 0,
    });
  },
  changeShebao(e) {
    if (e.detail.value != '') {
      var input = Number(e.detail.value);
      //极限值限制
      if (input < this.data.height.min) {
        input = this.data.height.min, this.data.userInput = input;
        this.setData({
          userInput: this.data.userInput
        })
      } else if (input > this.data.height.max) {
        input = this.data.height.max, this.data.userInput = input;
        this.setData({
          userInput: this.data.userInput
        })
      }
      this.setData({
        input: input
      })
      this.calculate()
    } else {
      this.init();
    }
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
    // console.log('atm', atm)
  },
  onShareAppMessage: function () {
    return {
      title: '标准大气计算',
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