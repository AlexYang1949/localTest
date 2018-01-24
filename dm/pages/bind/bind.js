// pages/bind/bind.js
const app = getApp()
var utils = require("../../utils/util.js");

Page({
  data: {
    munionId:'',
    title:''
  },
  inputTitle:function(e){
    this.setData({
      title:e.detail.value
    })
  },
  onLoad: function (options) {
    console.log('load')
    var scene = decodeURIComponent(options.scene)
    var params = null
    if(options.params){
      var params = JSON.parse(options.params)
    }
    if (params){
      this.setData({
        name: params.name,
        munionId: params.munionid,
        title: params.title,
        sharePage:false
      })
    } else if (scene != 'undefined'){
      this.setData({
        unionId: scene ,
        sharePage: false
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
  onShareAppMessage: function () {
    
    var that = this
    var params = {
      munionid: app.globalData.loginInfo.unionId,
      name: app.globalData.userInfo.nickName,
      title: that.data.title
    }
    console.log('邀请页面','/pages/bind/bind?params=' + JSON.stringify(params))
    return {
      title: app.globalData.userInfo.nickName+'邀请您绑定',
      path: '/pages/bind/agree' + JSON.stringify(params),
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    }
  }
})