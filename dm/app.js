//app.js
var utils = require("/utils/util.js");
App({
  API:{
    login:"siteapi/wp/jscode2session",
    feedback:"siteapi/feedback/wp",
    home:"siteapi/relation/home",
    locationList:"siteapi/trace/find",
    bind:"siteapi/relation/add",
    qrcode:"siteapi/wx/token",
    getInfo: "siteapi/wp/getInfo"
  },
  onLaunch: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var that = this
    // that.isLogin(null)
  },
  isLogin:function(complete){
    var that = this
    wx.showLoading({ title: '正在加载数据' })
    wx.login({
      success: res => {
        that.loginIn(res.code, complete)
      }
    })
  },
  loginIn: function (code,complete) {
    var that = this
    utils.post({
      url: that.API.login,
      data: {
        code: code
      },
      success: function (res) {
        that.globalData.loginInfo = res.data.result
        that.getInfo(complete)
        console.log('app授权成功', that.globalData.loginInfo)
      },
      fail: function (res) {
        console.log('app授权失败', res)
        wx.hideLoading()
      }
    })
  },
  getLocalUserInfo: function (completed){
    var that = this
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        that.globalData.userInfo = res.userInfo
        var data = {
          accessToken: that.globalData.loginInfo.accessToken,
          openId: that.globalData.loginInfo.openId,
          encryptedData: res.encryptedData,
          iv: res.iv
        }
        utils.post({
          url: that.API.getInfo,
          data: data,
          success: function (res) {
            console.log('app getUid', res)
            that.globalData.loginInfo.unionId = res.data.result.userName
            completed()
          },
          fail: function (res) {
            console.log('app getUidFail', res)
          },
          complete: function (res) {
            wx.hideLoading()
          }
        })
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  getInfo: function (complete) {
    var that = this
    wx.getSetting({
      withCredentials: true,
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          that.getLocalUserInfo(complete)
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              that.getLocalUserInfo(complete)
            }
          })
        }
      },
      fail:function(){
        console.log('获取用户授权信息失败')
        wx.showModal({
          title: '提示',
          content: '获取用户授权信息失败',
          showCancel: false
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    loginInfo:null
  }
})