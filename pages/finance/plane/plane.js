Page({
  data: {
    cities: ["计算表高", "计算表马赫数", "计算表速"],
    typeIndex: 0,
    unitIndex: 0,
    userDonya: '',
    userJingya: '',
    donya: 0,
    jingya: 0,
    id: 0,
    datas: [{
      lent: [{
        unit: 'm',
        value: '--',
        type: '表高'
      }, {
        unit: 'mach',
        value: '--',
        type: '表马赫数'
      }, {
        unit: 'km/h',
        value: '--',
        type: '表速'
      }]
    }]
  },
  bindCityChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      unitIndex: e.detail.value
    })
  },
  //计算表速
  vi(qci) {
    var a = qci / 101325 + 1;
    var b = Math.pow(a, 1 / 3.5) - 1;
    var c = Math.sqrt(b / 0.000000133265);
    return c;
  },
  //计算表高
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
  //计算马赫数
  ma(qci, psi) {
    var a = qci / psi + 1;
    var b = Math.pow(a, 1 / 3.5) - 1
    return Math.sqrt(b / 0.2)
  },
  calculate() {
    //console.log(this.data.donya, this.data.jingya)
    var o = this.data.datas[this.data.typeIndex].lent;
    o[0].value = this.hpi(this.data.jingya * 1000).toFixed(4);
    o[1].value = this.ma(this.data.donya, this.data.jingya).toFixed(4);
    o[2].value = this.vi(this.data.donya * 1000).toFixed(4);
    this.setData({
      datas: this.data.datas,
    });
  },
  init(para) {
    var a = this.data.datas[this.data.typeIndex].lent;
    for (var i = 0; i < a.length; i++) {
      a[i].value = '--'
    }
    this.setData({
      datas: this.data.datas,
    });

    if (para == 1) {
      this.setData({
        donya: 0
      })
    } else if ( para == 2) {
      this.setData({
        jingya: 0
      })
    }
  },
  changeDongya(e) {
    if (e.detail.value != '') {
      var donya = Number(e.detail.value);
      if (donya < 0) donya = 0;
      this.setData({
        donya: donya
      })
      if (this.data.jingya > 0) {
        this.calculate();
      }
    } else {
      this.init(1);
    }
  },
  changeJingya(e) {
    //console.log('value', e.detail.value);
    if (e.detail.value != '') {
      var jingya = Number(e.detail.value);
      if (jingya < 0) jingya = 0;
      this.setData({
        jingya: jingya
      })
      if (this.data.donya > 0) {
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
      title: '动静压计算',
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