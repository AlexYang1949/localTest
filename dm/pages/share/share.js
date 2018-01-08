// pages/share/share.js
const app = getApp()
var utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share:false
  },
  share: function(){
    this.setData({
      share: true
    })
  },
  hide:function(){
    this.setData({
      share: false
    })
  },
  save: function(){
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: '/source/share_image.png',
      success:function(res){
        that.setData({
          share: false
        })
        wx.showToast({
          title: '保存成功'
        })
        
      },fail:function(res){
        that.setData({
          share: false
        })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '爸妈在哪儿',
      path: '/pages/index/index',
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    }
  }
})