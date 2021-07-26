var atm = require("../../../utils/atm.js");

Page({
  data: {
    cities: ["表速(km/h)", "马赫数(mach)", "真速(km/h)"],
    typeIndex: 0,
    unitIndex: 0,
    userHeight: '',
    userVal: '',
    height: 0,
    val: 0,
    atm: {
      height: 0,
      wendu: 0,
      jingya: 0,
      midu: 0
    },
    id: 0,
    datas: [{
      lent: [{
        unit: 'm',
        value: '--',
        type: '高度'
      }, {
        unit: 'mach',
        value: '--',
        type: '表马'
      }, {
        unit: 'km/h',
        value: '--',
        type: '表速'
      }, {
        unit: 'km/h',
        value: '--',
        type: '真速'
      }, {
        unit: 'Kpa',
        value: '--',
        type: '动压'
      }, {
        unit: 'Kpa',
        value: '--',
        type: '静压'
      }, {
        unit: 'Kpa',
        value: '--',
        type: '总压'
      }, {
        unit: 'K',
        value: '--',
        type: '静温'
      }]
    }]
  },
  bindCityChange: function (e) {
    //console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      unitIndex: e.detail.value
    })
    this.calculate();
  },
  //动压计算表速
  vi(qci) {
    var a = qci / 101325 + 1;
    var b = Math.pow(a, 1 / 3.5) - 1;
    var c = Math.sqrt(b / 0.000000133265);
    return c;
  },
  //静压计算表高
  hpi(psi) {
    if (psi >= 22632) {
      var a = psi / 101325;
      var b = 1 - Math.pow(a, 1 / 5.25588);
      return 44330.8 * b;
    } else if (psi >= 5474.88 && psi < 22632) {
      var a = psi / 22632;
      var b = Math.log(a);
      return b * 6341.62 + 11000;
    } else if (psi > 868.02 && psi < 5474.88) {
      var a = psi / 5474.88;
      var b = Math.pow(a, 1 / -34.1632) - 1;
      return b / 0.00000461574;
    } else {
      return 0
    }
  },
  //动压，静压计算马赫数
  ma(qci, psi) {
    var a = qci / psi + 1;
    var b = Math.pow(a, 1 / 3.5) - 1
    return Math.sqrt(b / 0.2)
  },
  //马赫数、静压计算动压
  donya2(psi, ma) {
    var a = Math.pow(ma, 2) * 0.2 + 1;
    var b = Math.pow(a, 3.5) - 1
    return b * psi
  },
  //表速算动压
  qci(vi) {
    var a = Math.pow(vi, 2) * 0.000000133265 + 1;
    var b = Math.pow(a, 3.5) - 1;
    return b * 101.325
  },
  //计算
  calculate() {
    //console.log(this.data.height, this.data.val)
    var o = this.data.datas[this.data.typeIndex].lent;
    this.jingya(this.data.height);
    //高度
    o[0].value = this.data.height;
    //静压
    o[5].value = this.data.atm.jingya;
    //静温
    o[7].value = this.data.atm.wendu;

    if (Number(this.data.unitIndex) == 0) {
      o[2].value = this.data.val;
      //动压
      o[4].value = this.qci(this.data.val).toFixed(4);
      //真速
      var temp = Math.pow(this.data.val, 2) * 1.225;
      o[3].value = Math.sqrt(temp / this.data.atm.midu).toFixed(4);
      //马赫数
      o[1].value = this.ma(o[4].value, o[5].value).toFixed(4);
    } else if (Number(this.data.unitIndex) == 1) {
      o[1].value = this.data.val;
      o[4].value = this.donya2(o[5].value, this.data.val).toFixed(4);
      o[2].value = this.vi(o[4].value * 1000).toFixed(4);
      //真速
      var temp2 = Math.pow(o[2].value, 2) * 1.225;
      o[3].value = Math.sqrt(temp2 / this.data.atm.midu).toFixed(4);
    } else if (Number(this.data.unitIndex) == 2) {
      o[3].value = this.data.val;
      //表速
      var temp3 = Math.pow(this.data.val, 2) * this.data.atm.midu
      o[2].value = Math.sqrt(temp3 / 1.225).toFixed(4);
      //动压
      o[4].value = this.qci(o[2].value).toFixed(4);
      //马赫数
      o[1].value = this.ma(o[4].value, o[5].value).toFixed(4);
    }
    //总压
    var zongya = Number(o[4].value) + Number(o[5].value);
    o[6].value = zongya.toFixed(4);
    //速压
    // var suya = Math.pow(o[3].value,2) * this.data.atm.midu / 2000;
    // o[8].value = suya.toFixed(4);
    this.setData({
      datas: this.data.datas,
    });
  },
  //计算静压
  jingya(hei) {
    var arr = atm.atm;
    var std = hei / 1000;
    var data = {};
    for (let i = 0; i < arr.length; i++) {
      if (std > arr[i].height && std <= arr[i + 1].height) {
        if ((std - arr[i].height) < (arr[i + 1].height - std)) {
          data.height = hei;
          data.jingya = arr[i].pressure / 1000;
          data.wendu = arr[i].temperature;
          data.midu = arr[i].density;
        } else {
          data.height = hei;
          data.jingya = arr[i + 1].pressure / 1000;
          data.wendu = arr[i + 1].temperature;
          data.midu = arr[i + 1].density;
        }
      }
    }
    this.setData({
      atm: data,
    });
  },
  //初始化
  init(para) {
    var a = this.data.datas[this.data.typeIndex].lent;
    for (var i = 0; i < a.length; i++) {
      a[i].value = '--'
    }
    this.setData({
      datas: this.data.datas
    });

    if (para == 1) {
      this.setData({
        height: 0
      })
    } else if (para == 2) {
      this.setData({
        val: 0
      })
    }
  },
  changeHeight(e) {
    if (e.detail.value != '') {
      var height = Number(e.detail.value);
      //if (height < 0) height = 0;
      this.setData({
        height: height
      })
      if (this.data.val > 0) {
        this.calculate();
      }
    } else {
      this.init(1);
    }
  },
  changeVal(e) {
    if (e.detail.value != '') {
      var val = Number(e.detail.value);
      //if (val < 0) val = 0;
      this.setData({
        val: val
      })
      if (this.data.height > 0) {
        this.calculate();
      }
    } else {
      this.init(2);
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
  },
  onShareAppMessage: function () {
    return {
      title: '表速、真速、马赫数计算',
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