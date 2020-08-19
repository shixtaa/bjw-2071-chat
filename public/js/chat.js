let inputEle=document.querySelector('.chat-input')

function test(){
  
}
inputEle.onkeydown=function test(e){
  let key=e.which
  if(key==13){
    var content=inputEle.value
    if(content){
      $.ajax({
        type:'post',
        url:'http://192.168.10.182:3000/chat/addContent',
        data:{
          content
        // date
        },
        success:(result)=>{
          inputEle.value=''
          $('.chat-content').html('')
          let html=''
          result.forEach((item)=>{
            html+=`<div class='talking'>
          <div class="left">
              <img src='${item.avatar}' alt="">
              <span class="name">${item.nickName}</span>
          </div>
          <span class="content">${item.content}</span>
          <div class="time">
          ${moment(item.createdBy).locale('zh-cn').format('YYYYMMMMDo aH:mm:ss')}
          </div>    
      </div>`
          })
          $('.chat-content').html(html) 
          $('.chat-content').scrollTop($('.chat-content').prop('scrollHeight'))
        }
      })
    }
    
    
  }
}

// setInterval(function(){
//   inputEle.onkeydown
// },2)
