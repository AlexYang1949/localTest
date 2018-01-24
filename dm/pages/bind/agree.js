// pages/bind/bind.js
const app = getApp()
var utils = require("../../utils/util.js");

Page({
  data: {
    unionId: '',
    munionId: '',
    name: '',
    title: ''
  },
  bindFormSubmit: function (e) {
    if (!e.detail.value.textarea && !this.data.title) {
      wx.showModal({
        title: '提示',
        content: '请输入邀请人身份'
      })
      return;
    }
    var title = e.detail.value.textarea ? e.detail.value.textarea : this.data.title
    this.data.title = title
    if (!app.globalData.loginInfo.unionId) {
      app.isLogin(this.bind)
      console.log('需要授权')
      return
    } else {
      console.log('不需要授权')
      this.bind()
    }
  },
  bind: function (title) {
    var unionId = this.data.unionId
    var munionId = this.data.munionId
    if (!unionId) {
      unionId = app.globalData.loginInfo.unionId
    }
    if (!munionId) {
      munionId = app.globalData.loginInfo.unionId
    }

    console.log(app.globalData.loginInfo.unionId)
    var data = {
      openId: app.globalData.loginInfo.openId,
      accessToken: app.globalData.loginInfo.accessToken,
      unionId: unionId,
      munionId: munionId,
      title: this.data.title
    }
    console.log('绑定数据', data)
    utils.post({
      url: app.API.bind,
      data: data,
      success: function (res) {
        if (res.data.errorCode == 200) {
          console.log('绑定成功', res.data)
          wx.showToast({
            title: '绑定成功'
          })
          wx.navigateTo({
            url: '/pages/download/download',
          })
        } else {
          console.log('绑定失败', res.data)
          wx.showModal({
            title: '绑定失败',
            content: res.data.errorMessage,
            showCancel: false
          })
        }
      }, fail: function (res) {
        wx.showModal({
          title: '绑定失败',
          content: res.data.errorMessage,
          showCancel: false
        })
      }
    })
  },
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene)
    var params = null
    if (options.params) {
      var params = JSON.parse(options.params)
    }
    if (params) {
      this.setData({
        name: params.name,
        munionId: params.munionid,
        title: params.title
      })
    } else if (scene != 'undefined') {
      this.setData({
        unionId: scene
      })
    }
    console.log('data', this.data)
  },

  onReady: function () {

  },

  onShow: function () {
    if (!app.globalData.loginInfo) {
      app.isLogin(null)
      return
    }
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
  onShareAppMessage: function () {}
})