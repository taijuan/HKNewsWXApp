// pages/video-detail/video-detail.js
var dataId = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: null,
    array: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    dataId = options.dataId
    wx.startPullDownRefresh({

    })
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
    var url = "https://api.cdeclips.com/hknews-api/selecNewsDetail?dataId=" + dataId
    var that = this
    wx.request({
      url: url,
      success: function(e) {
        var data = e.data.resObject
        // wx.setNavigationBarTitle = data.title
        var url = "https://api.cdeclips.com/hknews-api/selectNewsList?subjectCode=" + data.subjectCode + "&currentPage=1&dataType=3"
        wx.request({
          url: url,
          success: function(res) {
            that.setData({
              array: res.data.resObject.dateList,
              data: data,
              isLoadMore: false
            })
          },
          complete: function() {
            wx.stopPullDownRefresh()
          }
        })
      }
    })
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

  },
})