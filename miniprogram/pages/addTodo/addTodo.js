// pages/addTodo/addTodo.js
const db = wx.cloud.database()
const todos = db.collection('todos')
Page({
  data:{
    image: null
  },
  selectImage: function(e){
    wx.chooseImage({
      success: res => {
        console.log(res.tempFilePaths[0])
        wx.cloud.uploadFile({
          cloudPath: `${Math.floor(Math.random()*10000000)}.png`,
          filePath: res.tempFilePaths[0]
        }).then(res => {
          console.log(res.fileID)
          this.setData({
            image: res.fileID
          })
        }).catch(err => {
          console.error(err)
        })
      },
    })
  },
  onSubmit:  function(event){
  todos.add({
    data: {
      title: event.detail.value.title,
      image: this.data.image
    }
  }).then(res =>{
    console.log(res._id)
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      success:res2 => {
        wx.redirectTo({
          url: `../todoInfo/todoInfo?id=${res._id}`,
        })
      }
    })
  })
}
})