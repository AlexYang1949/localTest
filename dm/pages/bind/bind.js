// pages/bind/bind.js
const app = getApp()
var utils = require("../../utils/util.js");

Page({
  data: {
    unionId:'',
    muninoId:'',
    name:'',
    title:'',
    sharePage: true
  },
  inputTitle:function(e){
    console.log(e.detail.value)
    this.setData({
      title:e.detail.value
    })
  },
  bindFormSubmit: function (e) {
    if (!e.detail.value.textarea&&!this.data.title){
      wx.showModal({
        title: '提示',
        content: '请输入邀请人身份',
      })
      return;
    }
    var title = e.detail.value.textarea ? e.detail.value.textarea : this.data.title
    var unionId = this.data.unionId
    var munionId = this.data.munionId
    if (!unionId){
      unionId = app.globalData.loginInfo.unionId
    }
    if (!munionId){
      munionId = app.globalData.loginInfo.unionId
    }
    var data = {
      openId: app.globalData.loginInfo.openId,
      accessToken: app.globalData.loginInfo.accessToken,
      unionId: unionId,
      munionId: munionId,
      title: title
    }
    console.log(data);
    this.bind(data)
  },
  bind:function(data){
    utils.post({
      url: app.API.bind,
      data: data,
      success: function (res) {
        if (res.data.errorCode == 200) {
          console.log('绑定成功', res.data)
          wx.showToast({
            title: '绑定成功'
          })
        } else {
          console.log('绑定失败', res.data)
          wx.showModal({
            title: '绑定失败',
            content: res.errMsg,
            showCancel:false
          })
        }
      }, fail: function (res) {
        wx.showModal({
          title: '绑定失败',
          content: res.errMsg,
          showCancel: false
        })
      }
    })
  },
  onLoad: function (options) {
    var params = JSON.parse(options.params)
    // wx.showModal({
    //   title: '绑定参数',
    //   content: options.params,
    //   showCancel: false
    // })
    if (params.munionid || params.unionId){
      this.setData({
        unionId: params.unionId,
        name: params.name,
        munionId: params.munionid,
        title: params.title,
        sharePage:false
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
    var that = this
    var params = {
      munionid: app.globalData.loginInfo.unionId,
      name: app.globalData.userInfo.nickName,
      title: that.data.title
    }
    console.log('/pages/bind/bind?params=' + JSON.stringify(params))
    console.log(app.globalData.userInfo)
    return {
      title: app.globalData.userInfo.nickName+'邀请您绑定',
      path: '/pages/bind/bind?params=' + JSON.stringify(params),
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    }
  }
})