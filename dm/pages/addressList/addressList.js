// pages/addressList/addressList.js
var utils = require("../../utils/util.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList:null,
    headUrl:'',
    unionId:'',
    noData:false
  },
  locationList:function(){
    var that = this
    var data = {
      openId: app.globalData.loginInfo.openId,
      accessToken: app.globalData.loginInfo.accessToken,
      unionId: that.data.unionId
    }
    console.log('参数',data)
    utils.post({
      url: app.API.locationList,
      data: data,
      success: function (res) {
        var data = res.data
        if (data.errorCode == 200) {
          that.setData({
            memberList: data.result.content
          })
          if (that.data.memberList.length==0){
            that.setData({
              noData: !that.data.memberList.length
            })
          }
        }
        console.log('历史列表',that.data.memberList)
      }, fail: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      unionId: options.unionId,
      headUrl : options.headUrl
    })
    wx.setNavigationBarTitle({
      title: options.title+'的位置'//页面标题为路由参数
    })
    this.locationList()
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
  
  }
})