Page({
  data: {
    grids: [{
      key: 0,
      abbr: "0-AM",
      name: "高度/表Ma/表速/估算真速换算"
    }]
  },
  haveTea() {
    //跳转赞赏页面
    // wx.navigateTo({
    //   url: '/pages/pay/pay',
    // })
    wx.previewImage({
      current: 'https://zz570557024.gitee.io/images/nice.png', // 当前显示图片的http链接
      urls: ['https://zz570557024.gitee.io/images/nice.png'] // 需要预览的图片http链接列表
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '试飞参数计算器',
      path: '/pages/finance/finance',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
});