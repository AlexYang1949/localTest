// pages/bind/bind.js
const app = getApp()
var utils = require("../../utils/util.js");

Page({
  data: {
    unionId:'',
    name:''
  },
  bindFormSubmit: function (e) {
    if (!e.detail.value.textarea){
      wx.showModal({
        title: '提示',
        content: '请输入和绑定人关系',
      })
    }
    var data = {
      openId: app.globalData.loginInfo.openId,
      accessToken: app.globalData.loginInfo.accessToken,
      unionId:this.data.unionId,
      title: e.detail.value.textarea
    }
    console.log(data)
    utils.post({
      url: app.API.bind,
      data:data,
      success:function(res){
        if (res.data.errorCode==200){
          console.log('绑定成功', res.data)
          wx.showToast({
            title: '绑定成功'
          })
        }else{
          console.log('绑定失败', res.data)
          wx.showToast({
            title: res.data.errorMessage
          })
        }
        
      },fail:function(res){
        wx.showToast({
          title: '绑定失败'
        })
      }
    })
  },
  onLoad: function (options) {
    if (options.unionId){
      this.setData({
        unionId: options.unionId,
        name: options.name
      })
    }
  },

  onReady: function () {
  
  },

  onShow: function () {
  
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('/pages/bind / bind ? name = ' + app.globalData.userInfo.nickName + ' & unionId = ' + app.globalData.loginInfo.unionId)
    return {
      title: app.globalData.userInfo.nickName+'邀请您绑定',
      path: '/pages/bind/bind?name=' + app.globalData.userInfo.nickName + '&unionId = ' + app.globalData.loginInfo.unionId,
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    }
  }
})