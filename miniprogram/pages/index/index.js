// pages/index.js
const db = wx.cloud.database()
const todos = db.collection('todos')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  onReady: function () {
    
  },
  onShow: function () {

  },
  // 下拉刷新
  onPullDownRefresh: function(){
    this.getData(res => {
      wx.stopPullDownRefresh()
    })
    this.pageData.skip = 0
    this.tasks = []
  },
  // 触底刷新
  onReachBottom: function(){
    this.getData()
  },
  getData: function(callback){
    if(!callback){
      callback = res => {}
    }
    wx.showLoading({
      title: '数据加载中',
    })
    todos.skip(this.pageData.skip).get().then(res => {
      let oldData = this.data.tasks
      this.setData({
        tasks: oldData.concat(res.data)
      },res => {
        this.pageData.skip += 20
        wx.hideLoading()
        callback()
      })
    })
  },
  pageData: {
    skip: 0
  }
})