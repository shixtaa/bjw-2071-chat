let inputEle=document.querySelector('.chat-input')
let timer
let originData

renderAll()

scrollToBottom()
inputEle.onkeydown=(e)=>{
  let key=e.which
  if(key==13){
    var content=inputEle.value
    if(content){
      $.ajax({
        type:'post',
        url:'http://192.168.10.182:3000/chat/addContent',
        data:{
          content
        },
        success:(result)=>{
          inputEle.value=''
          $('.chat-content').html('')
          renderChat(result)
          originData=result
          scrollToBottom()
        }
      })
    }
  }
}

function renderAll(){
  $.ajax({
    type:'get',
    url:'http://192.168.10.182:3000/chat/getContent',
    data:{},
    success:(result)=>{
      originData=result
      stopPolling()
      longPolling()
    }
  })
}
function renderChat(contents){
  let html=''
  contents.forEach((item)=>{
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
}

function scrollToBottom(){
  let ele=document.querySelector('.chat-content')
  ele.scrollTop=ele.scrollHeight
}

function longPolling(){
  timer=setInterval(()=>{
    $.ajax({
      type:'get',
      url:'http://192.168.10.182:3000/chat/getContent',
      data:{},
      success:(result)=>{
        renderChat(result)
        let times=0
        result.filter((item)=>{
          if(moment(originData[originData.length-1].createdBy).isBefore(moment(item.createdBy))){
            times++ 
          }
        })
        
        if(times>0){
          console.log(times)
          renderWarning(times)
        }else{
          console.log('没有新消息')
        }
      }
    })
  },2000)
}

function stopPolling(){
  if(timer){
    clearInterval(timer)
  }
}


const warningEle=document.querySelector('.warning')
let flag=true
function renderWarning(times){
  if(times>0){
    let html='有'+times+'条新消息'
    $('.warning').html(html)
    warningEle.style.backgroundColor='grey'
    warningEle.style.display='block'
  }
}

warningEle.onclick=function(){
  scrollToBottom()
  warningEle.style.display='none'
  $.ajax({
    type:'get',
    url:'http://192.168.10.182:3000/chat/getContent',
    data:{},
    success:(result)=>{
      originData=result
    }
  })
  // renderChat(originData)
  
}





