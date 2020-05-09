// pages/index.js
const db = wx.cloud.database()
const todos = db.collection('todos')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
  onPullDownRefresh: function(){
    this.getData(res => {
      wx.stopPullDownRefresh()
    })
  },
  getData: function(callback){
    if(!callback){
      callback = res => {}
    }
    wx.showLoading({
      title: '数据加载中',
    })
    todos.get().then(res => {
      this.setData({
        tasks: res.data
      },res => {
        wx.hideLoading()
        callback()
      })
    })
  }
})