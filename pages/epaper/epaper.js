// pages/epaper/epaper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    epaper_backgroud: "../../images/epaper_background.png",
    epaper_text:"../../images/epaper_textimg.png",
    epapers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    var url = "https://epaperlib.chinadailyhk.com/pubs/config.json"
    var that = this
    wx.request({
      url: url,
      success: function(res) {
        console.log(res)
        var a = []
        a = res.data.newestPubDate
        a = a.filter(function(e) {
          e.imageUrl = "../../images/epaper_pic.png"
          e.epaperUrl = "https://epaperlib.chinadailyhk.com/mobile/index.html?pubCode=" + e.publicationCode + "&pubDate=" + e.pubDate
          return e.publicationConfig.isHide == 0
        })
        that.setData({
          epapers: a
        })
        a.forEach(function(e) {
          var code = e.publicationCode
          var date = e.pubDate.replace("-", "/").replace("-", "/")
          console.log(e.puDate)
          var url = "https://epaperlib.chinadailyhk.com/pubs/" + code + "/" + date + "/issue.json"
          wx.request({
            url: url,
            success: function(b) {
              console.log(b)
              e.imageUrl = "https://epaperlib.chinadailyhk.com/pubs" + b.data.data[0].snapshotBigUrl
              console.log(a)
              that.setData({
                epapers: a
              })
            }
          })
        })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  goToWeb: function (e) {
    var url = e.currentTarget.dataset.url
    console.log(e)
    wx.navigateTo({
      url: '../../pages/web/web?url=' + url,
    })
  }
})