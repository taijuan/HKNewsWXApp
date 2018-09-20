// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [{
        icon: "../../images/favorite.png",
        name: "My Favorites",
        pagePath: ""
      },
      {
        icon: "../../images/facebook.png",
        name: "Facebook",
        pagePath: "../../pages/web/web?url=https://www.facebook.com/chinadailyhkedition/"
      },
      {
        icon: "../../images/twitter.png",
        name: "Twitter",
        pagePath: "../../pages/web/web?url=https://twitter.com/chinadailyasia"
      },
      {
        icon: "../../images/feedback.png",
        name: "Feedback",
        pagePath: ""
      },
      {
        icon: "../../images/settings.png",
        name: "Settings",
        pagePath: ""
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})