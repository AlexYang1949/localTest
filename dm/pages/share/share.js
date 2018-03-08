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
  saveImage: function(){
    var that = this
    wx.downloadFile({
      url:'https://www.witcat.cn/apk/proshare.png',
      success:res=>{
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log("保存成功")
            that.setData({
              share: false
            })
            wx.showToast({
              title: '保存成功'
            })

          }, fail: function (res) {
            console.log("保存失败", res)
            that.setData({
              share: false
            })
            wx.getSetting({
              withCredentials: true,
              success: res => {
                console.log("getSetting success")
                if (!res.authSetting['scope.writePhotosAlbum']) {
                  wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success: function () {
                      wx.showToast({
                        title: '请重试',
                      })
                      console.log("authorize success")
                    },
                    fail: res => {
                      console.log("authorize fail")
                      wx.showModal({
                        title: '保存失败',
                        content: '请开启访问相册权限后重试',
                        showCancel: false,
                        success: function (res) {
                          wx.openSetting({
                            success: res => {
                              that.getLocalUserInfo(complete)
                            }
                          })
                        }
                      })
                    }
                  })
                }
              },
              fail: function (res) {
                console.log("getSetting fail")
              }
            })
          }
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