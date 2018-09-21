Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: 0,
    scrollLeft: 0,
    maps: [{
        name: "HOME",
        value: "home",
        hot: [],
        data: [],
        isLoadMore: false,
        curPage: 1
      }, {
        name: "HONG KONG",
        value: "hong_kong",
        hot: [],
        data: [],
        isLoadMore: false,
        curPage: 1
      },
      {
        name: "NATION",
        value: "nation",
        hot: [],
        data: [],
        isLoadMore: false,
        curPage: 1
      },
      {
        name: "ASIA",
        value: "asia",
        hot: [],
        data: [],
        isLoadMore: false,
        curPage: 1
      },
      {
        name: "WORLD",
        value: "world",
        hot: [],
        data: [],
        isLoadMore: false,
        curPage: 1
      },
      {
        name: "BUSINESS",
        value: "business",
        hot: [],
        data: [],
        isLoadMore: false,
        curPage: 1
      },
      {
        name: "DATA",
        value: "data",
        hot: [],
        data: [],
        isLoadMore: false,
        curPage: 1
      },
      {
        name: "SPORTS",
        value: "sports",
        hot: [],
        data: [],
        isLoadMore: false,
        curPage: 1
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.startPullDownRefresh()
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
    var ab = this.data.maps
    var index = this.data.curIndex
    var item = ab[index]
    var name = ab[index].value
    var curPage = 1
    var url = ""
    var isHome = name == "home"
    if (isHome) {
      url = 'https://api.cdeclips.com/hknews-api/homeDataNewsList'
    } else {
      url = "https://api.cdeclips.com/hknews-api/selectNewsList?subjectCode=" + name + "&currentPage=" + curPage + "&dataType=1"
    }
    var that = this;
    wx.request({
      url: url,
      success: function(res) {
        if (isHome) {
          item.hot = res.data.resObject.top_focus
          item.data = res.data.resObject.allLists
          item.isLoadMore = false
        } else {
          item.data = res.data.resObject.dateList
          item.isLoadMore = true
        }
        item.curPage = curPage
        console.log(that.data)
        console.log(ab)
        that.setData({
          maps: ab
        })
      },
      fail: function(e) {

      },
      complete: function() {
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var index = this.data.curIndex
    var name = this.data.maps[this.data.curIndex].value
    if (name == "home") {
      console.log("home")
      return
    }
    console.log("ohter")
    var curPage = this.data.maps[this.data.curIndex].curPage + 1
    var url = "https://api.cdeclips.com/hknews-api/selectNewsList?subjectCode=" + name + "&currentPage=" + curPage + "&dataType=1"
    var that = this;
    var ab = that.data.maps
    var item = ab[index]
    wx.request({
      url: url,
      success: function(res) {
        var a = res.data.resObject.dateList
        item.data = item.data.concat(a)
        item.curPage = curPage
        item.isLoadMore = a.length != 0
        that.setData({
          maps: ab
        })
      },
      fail: function(e) {

      },
      complete: function() {
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * tab切换
   */
  onTabChange: function(e) {
    var index = e.currentTarget.dataset.index
    var a = this.data.maps[index].data
    console.log(index)
    this.setData({
      curIndex: index
    })
    if (a.length == 0) {
      wx.startPullDownRefresh()
    }
  }
})