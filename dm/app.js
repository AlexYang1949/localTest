//app.js
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
    wx.setStorageSync('logs', logs)
    
  
    // 获取用户信息
    wx.getSetting({
      withCredentials:true,
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('getUserInfo',res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          
        }
      }
    })
  },
  
  globalData: {
    userInfo: null,
    loginInfo:null
  }
})