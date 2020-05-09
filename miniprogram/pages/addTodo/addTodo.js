// pages/addTodo/addTodo.js
const db = wx.cloud.database()
const todos = db.collection('todos')
Page({
onSubmit:  function(event){
  console.log(event.detail.value.title)
  todos.add({
    data: {
      title: event.detail.value.title
    }
  }).then(res =>{
    wx.showToast({
      title: 'Success',
      icon: 'success'
    })
  })
}
})