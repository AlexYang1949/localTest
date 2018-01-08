//index.js
//获取应用实例
const app = getApp()
var utils = require("../../utils/util.js");

Page({
  data: {
    selected:false,
    selectIndex:0,
    memberList: [],
    markers: [],
    hasMarkers:false
  },
  onShow:function(){
    // 登录
    this.getHomeData() 
  },
  //事件处理函数
  selectTitle: function(){
    var selectB = !this.data.selected
    this.setData({
      selected: selectB
    })
  },
  selectItem: function(event){
    this.setData({
      selectIndex: event.currentTarget.dataset.index,
      selected:false,
    }) 
    this.updateMap()
  },
  suggest: function (event){
    wx.navigateTo({
      url: '../suggest/suggest'
    })
  },
  refresh:function(){
    this.updateMap()
  },
  addressList:function(){
    var member = this.data.memberList[this.data.selectIndex]
    
    wx.navigateTo({
      url: '../addressList/addressList?unionId=' + member.unionId + '&title=' + member.title + '&headUrl=' + member.headUrl
    })
  },
  onLoad: function (options) {
    var that = this
    wx.login({
      success: res => {
        that.loginIn(res.code)
      }
    })
  },
  loginIn:function(code){
    var that = this
    utils.post({
      url: app.API.login,
      data: {
        code: code
      },
      success: function (res) {
        app.globalData.loginInfo = res.data.result
        // that.getInfo()
        that.getHomeData()
        console.log('授权成功', app.globalData.loginInfo)
      },
      fail: function (res) {
        console.log('授权失败', res)
      }
    })
  },
  getInfo:function(){
    wx.getSetting({
      withCredentials: true,
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              console.log('getUserInfo', res)
              var data = {
                accessToken: app.globalData.loginInfo.accessToken,
                openId: app.globalData.loginInfo.openId,
                encryptedData: res.encryptedData,
                iv: res.iv
              }
              console.log('getUid',data)
              utils.post({
                url: app.API.getInfo,
                data:data,
                success:function(res){
                  app.globalData.loginInfo.unionId = res.result.userName
                  console.log(app.globalData.loginInfo.unionId)
                },
                fail:function(res){
                  console.log('getUidFail',res)
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {

        }
      }
    })
  },
  getHomeData:function(){
    var that = this
    wx.showLoading({ title:'正在加载数据'})
    console.log(app.globalData.openId)
    utils.post({
      url: app.API.home,
      data:{
        openId: app.globalData.loginInfo.openId,
        accessToken: app.globalData.loginInfo.accessToken
      },
      success:function(res){
        var data = res.data
        if(data.errorCode == 200){
          that.setData({
            memberList: data.result.content
          })
        }
        that.updateMap()
        if (!that.data.memberList || that.data.memberList.length==0){
          wx.showModal({
            title: '提示',
            content: '暂未绑定父母，请前往绑定页面绑定',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        console.log(that.data.memberList)
      },fail:function(res){
        console.log(res)
      },
      complete : function(res){
        console.log('finish')
        wx.hideLoading()
      }
    })
  },
  updateMap(){
    this.setData({
      hasMarkers: false
    })
    this.setData({
      markers: [{
        latitude: this.data.memberList[this.data.selectIndex].latitude,
        longitude: this.data.memberList[this.data.selectIndex].longitude,
        width: 40,
        height: 40,
        scale: 12,
        iconPath: '/source/icon_location.png',
        callout: {
          content: this.data.memberList[this.data.selectIndex].nickname,
          display: 'ALWAYS',
          color: '#000000',
          fontSize: 20,
          borderRadius: 10,
          bgColor: '#FFFF00',
          padding: 3
        }
      }],
      hasMarkers:true
    })
  }
})
