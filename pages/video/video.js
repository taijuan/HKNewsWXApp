// pages/video/video.js
var curPage
var isLoading = false
var isLoadMore = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    isLoadMore: true,
    isLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.startPullDownRefresh({
      success: function() {},
      fail: function() {},
      complete: function() {}
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
    if (isLoading) {
      wx.stopPullDownRefresh()
      return
    }
    var that = this
    isLoading = true
    wx.request({
      url: "https://api.cdeclips.com/hknews-api/selectNewsList?currentPage=" + 1 + "&dataType=3",
      success: function(res) {
        that.curPage = 1
        that.setData({
          array: res.data.resObject.dateList,
          isLoadMore: true
        })
      },
      fail: function(res) {
        that.setData({
          resObject: {
            errMsg: res.errMsg
          }
        })
      },
      complete: function() {
        wx.stopPullDownRefresh()
        isLoading = false
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.isLoading) {
      return
    }
    var that = this
    isLoading = true
    wx.request({
      url: "https://api.cdeclips.com/hknews-api/selectNewsList?currentPage=" + (that.curPage + 1) + "&dataType=3",
      success: function(res) {
        that.curPage = that.curPage + 1
        var newArray = res.data.resObject.dateList;
        var array = []
        array = array.concat(that.data.array, newArray)
        that.setData({
          array: array,
          isLoadMore: newArray.length != 0
        })
      },
      fail: function(res) {
        wx.showToast({
          title: res.errMsg,
        })
      },
      complete: function() {
        isLoading = false
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})