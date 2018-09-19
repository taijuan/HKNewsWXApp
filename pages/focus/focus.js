Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: 0,
    scrollLeft: 0,
    maps: [{
        name: "LIFE & ART",
        value: "life_art",
        hot: [],
        data: [],
        isLoadMore: false,
        curPage: 1
      }, {
        name: "LEADERS",
        value: "leaders",
        hot: [],
        data: [],
        isLoadMore: false,
        curPage: 1
      },
      {
        name: "OFFBEAT HK",
        value: "offbeat_hk",
        hot: [],
        data: [],
        isLoadMore: false,
        curPage: 1
      },
      {
        name: "IN-DEPTH CHINA",
        value: "in_depth_china",
        hot: [],
        data: [],
        isLoadMore: false,
        curPage: 1
      },
      {
        name: "EYE ON ASIA",
        value: "eye_on_asia",
        hot: [],
        data: [],
        isLoadMore: false,
        curPage: 1
      },
      {
        name: "QUIRKY",
        value: "quirky",
        hot: [],
        data: [],
        isLoadMore: false,
        curPage: 1
      },
      {
        name: "PHOTO",
        value: "photo",
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
    var index = this.data.curIndex
    var name = this.data.maps[this.data.curIndex].value
    var curPage = 1
    var url = ""
    var isHome = name == "home"
    if (isHome) {
      url = 'https://api.cdeclips.com/hknews-api/homeDataNewsList'
    } else {
      url = "https://api.cdeclips.com/hknews-api/selectNewsList?subjectCode=" + name + "&currentPage=" + curPage + "&dataType=1"
    }
    var that = this;
    var ab = that.data.maps
    var item = ab[index]
    wx.request({
      url: url,
      success: function(res) {
        if (isHome) {
          item.hot = res.data.resObject.top_focus
          item.data = res.data.resObject.allLists
        } else {
          item.data = res.data.resObject.dateList
        }
        item.curPage = curPage
        item.isLoadMore = index != 0
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
      return
    }
    var curPage = this.data.maps[this.data.curIndex].curPage + 1
    var url = "https://api.cdeclips.com/hknews-api/selectNewsList?subjectCode=" + name + "&currentPage=" + curPage + "&dataType=1"
    var that = this;
    var ab = that.data.maps
    var item = ab[index]
    wx.request({
      url: url,
      success: function(res) {
        item.data = item.data.concat(res.data.resObject.dateList)
        item.curPage = curPage
        item.isLoadMore = index != 0
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
    if (a.length == 0) {
      wx.startPullDownRefresh()
    }
    this.setData({
      curIndex: index
    })
  },

  goToWeb: function (e) {
    var url = 'https://www.chinadailyhk.com' + e.currentTarget.dataset.url
    console.log(url)
    wx.navigateTo({
      url: '../../pages/web/web?url=' + url,
    })
  }
})