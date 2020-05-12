// pages/addTodo/addTodo.js
const db = wx.cloud.database()
const todos = db.collection('todos')
Page({
  data: {
    images: []
  },
  // 不需要上传到页面中的数据
  pageData: {
    locationObj: {}
  },
  selectImage: function(e) {
    wx.chooseImage({
      success: res => {
        console.log(res)
        wx.cloud.uploadFile({
          cloudPath: `${Math.floor(Math.random()*10000000)}.png`,
          filePath: res.tempFilePaths[0]
        }).then(res => {
          console.log(res.fileID)
          this.setData({
            images: res.fileID
          })
        }).catch(err => {
          console.error(err)
        })
      },
    })
  },
  onSubmit: function(event) {
    todos.add({
      data: {
        title: event.detail.value.title,
        images: this.data.images,
        location: this.pageData.locationObj
      }
    }).then(res => {
      console.log(res._id)
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        success: res2 => {
          wx.redirectTo({
            url: `../todoInfo/todoInfo?id=${res._id}`,
          })
        }
      })
    })
  },
  chooseLocation: function(e) {
    wx.chooseLocation({
      success: res => {
        console.log(res)
        let locationObj = {
          latitude: res.latitude,
          longitude: res.longitude,
          name: res.name,
          address: res.address
        }
        this.pageData.locationObj = locationObj
      },
    })
  }
})