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
  copy:function(e){
    wx.setClipboardData({
      data: 'www.witcat.cn/apk/damao.apk',
      success:function(res){
        wx.showToast({
          title: '复制成功',
        })
      }
    })
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
    app.isLogin(this.getHomeData)
  },
  getHomeData : function(){
    if(!app.globalData.loginInfo.unionId) return
    var that = this
    wx.showLoading({ title:'正在加载数据'})
    utils.post({
      url: app.API.home,
      data:{
        openId: app.globalData.loginInfo.openId,
        accessToken: app.globalData.loginInfo.accessToken,
        munionId: app.globalData.loginInfo.unionId
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
            content: '暂未绑定父母，请前往绑定页面绑定'
          })
        }
        console.log('绑定列表',that.data.memberList)
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
